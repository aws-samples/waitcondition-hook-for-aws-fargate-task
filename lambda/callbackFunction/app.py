import json
import uuid
import os
import urllib3

url = os.environ['WAIT_CONDITION_HANDLE_URL']
http = urllib3.PoolManager()

"""
payload = {
    'Status' : status,
    'UniqueId' : uuid.uuid4(),
    'Data' : data,
    'Reason' : reason
}
"""
def send_wait_condition_response(status, data, reason):
    payload = {
        'Status' : status,
        'UniqueId' : str(uuid.uuid4()),
        'Data' : data,
        'Reason' : str(reason)
    }
    jsonpayload = json.dumps(payload)
    try:
        response = http.request('PUT', url, body=jsonpayload)
        print("Status code:", response.status)

    except Exception as e:
        print("send(..) FAILURE executing http.request(..):", e)
        

def lambda_handler(event, context):
    # Parsing the event JSON to get the task details
    print(event)
    status = 'FAILURE'
    data = 'Task failed'
    reason = 'Task failed'
    containers = event.get('Containers', [])
    if containers:
        for container in containers:
            exit_code = container.get('ExitCode')
            if exit_code is not None:
                # Check if the exit code indicates success or failure
                if exit_code == 0:
                    print(f"Container {container.get('ContainerArn')} completed successfully.")
                    status = 'SUCCESS'
                    data = 'Container completed'
                    send_wait_condition_response(status, data, exit_code)
                    return
                else: # should have no be triggered in most cases since this function should be triggered only when task succeed.
                    print('something goes wrong')
                    send_wait_condition_response(status, data, reason)
                    return
            else: #nasty edge case, just send failure and rollback
                print('something goes wrong')
                send_wait_condition_response(status, data, reason)
                return
    else: #nasty edge case,  just send failure and rollback
        print('something goes wrong')
        send_wait_condition_response(status, data, reason)
        return

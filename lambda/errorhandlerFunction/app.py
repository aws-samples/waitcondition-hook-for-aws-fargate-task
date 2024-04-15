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
    print(event)
    cause = json.loads(event.get('Cause'))
    conatiners = json.loads(cause.get('Containers'))
    stopped_reason = cause.get('StoppedReason')

    if cause: 
        if conatiners:
            for container in conatiners:
                exit_code = container.get('ExitCode')
                if exit_code and exit != 0: 
                    print(f"Container {container.get('ContainerArn')} failed with {exit_code}")
                    send_wait_condition_response('FAILURE', str(exit_code), stopped_reason)
                    return
                elif not exit_code: #happens when task failed to be created, e.g., image cannot be pull
                    print(f"Container {container.get('ContainerArn')} failed, {stopped_reason}")
                    send_wait_condition_response('FAILURE', str(exit_code), stopped_reason)
                    return
                else: #nasty edge case, just send failure and rollback
                    print(f"Container {container.get('ContainerArn')} failed, {stopped_reason}")
                    send_wait_condition_response('FAILURE', 'No Cause', stopped_reason)
                    return
        else: 
            print('something goes wrong')
            send_wait_condition_response('FAILURE', 'No Cause', 'No reason')
            return
    else: #nasty edge case, just send failure and rollback
        print('something goes wrong')
        send_wait_condition_response('FAILURE', 'No Cause', 'No reason')
        return

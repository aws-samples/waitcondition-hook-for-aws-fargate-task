# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### FargateRunner <a name="FargateRunner" id="waitcondition-hook-for-aws-fargate-task.FargateRunner"></a>

#### Initializers <a name="Initializers" id="waitcondition-hook-for-aws-fargate-task.FargateRunner.Initializer"></a>

```typescript
import { FargateRunner } from 'waitcondition-hook-for-aws-fargate-task'

new FargateRunner(scope: Construct, id: string, props: FargateRunnerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#waitcondition-hook-for-aws-fargate-task.FargateRunner.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#waitcondition-hook-for-aws-fargate-task.FargateRunner.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#waitcondition-hook-for-aws-fargate-task.FargateRunner.Initializer.parameter.props">props</a></code> | <code><a href="#waitcondition-hook-for-aws-fargate-task.FargateRunnerProps">FargateRunnerProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="waitcondition-hook-for-aws-fargate-task.FargateRunner.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="waitcondition-hook-for-aws-fargate-task.FargateRunner.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="waitcondition-hook-for-aws-fargate-task.FargateRunner.Initializer.parameter.props"></a>

- *Type:* <a href="#waitcondition-hook-for-aws-fargate-task.FargateRunnerProps">FargateRunnerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#waitcondition-hook-for-aws-fargate-task.FargateRunner.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="waitcondition-hook-for-aws-fargate-task.FargateRunner.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#waitcondition-hook-for-aws-fargate-task.FargateRunner.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="waitcondition-hook-for-aws-fargate-task.FargateRunner.isConstruct"></a>

```typescript
import { FargateRunner } from 'waitcondition-hook-for-aws-fargate-task'

FargateRunner.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="waitcondition-hook-for-aws-fargate-task.FargateRunner.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#waitcondition-hook-for-aws-fargate-task.FargateRunner.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#waitcondition-hook-for-aws-fargate-task.FargateRunner.property.waitConditionHanlderEndpoint">waitConditionHanlderEndpoint</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="waitcondition-hook-for-aws-fargate-task.FargateRunner.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `waitConditionHanlderEndpoint`<sup>Required</sup> <a name="waitConditionHanlderEndpoint" id="waitcondition-hook-for-aws-fargate-task.FargateRunner.property.waitConditionHanlderEndpoint"></a>

```typescript
public readonly waitConditionHanlderEndpoint: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### FargateRunnerProps <a name="FargateRunnerProps" id="waitcondition-hook-for-aws-fargate-task.FargateRunnerProps"></a>

#### Initializer <a name="Initializer" id="waitcondition-hook-for-aws-fargate-task.FargateRunnerProps.Initializer"></a>

```typescript
import { FargateRunnerProps } from 'waitcondition-hook-for-aws-fargate-task'

const fargateRunnerProps: FargateRunnerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#waitcondition-hook-for-aws-fargate-task.FargateRunnerProps.property.fargateTaskDef">fargateTaskDef</a></code> | <code>aws-cdk-lib.aws_ecs.TaskDefinition</code> | *No description.* |
| <code><a href="#waitcondition-hook-for-aws-fargate-task.FargateRunnerProps.property.count">count</a></code> | <code>number</code> | *No description.* |
| <code><a href="#waitcondition-hook-for-aws-fargate-task.FargateRunnerProps.property.timeout">timeout</a></code> | <code>string</code> | *No description.* |
| <code><a href="#waitcondition-hook-for-aws-fargate-task.FargateRunnerProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |

---

##### `fargateTaskDef`<sup>Required</sup> <a name="fargateTaskDef" id="waitcondition-hook-for-aws-fargate-task.FargateRunnerProps.property.fargateTaskDef"></a>

```typescript
public readonly fargateTaskDef: TaskDefinition;
```

- *Type:* aws-cdk-lib.aws_ecs.TaskDefinition

---

##### `count`<sup>Optional</sup> <a name="count" id="waitcondition-hook-for-aws-fargate-task.FargateRunnerProps.property.count"></a>

```typescript
public readonly count: number;
```

- *Type:* number

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="waitcondition-hook-for-aws-fargate-task.FargateRunnerProps.property.timeout"></a>

```typescript
public readonly timeout: string;
```

- *Type:* string

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="waitcondition-hook-for-aws-fargate-task.FargateRunnerProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---




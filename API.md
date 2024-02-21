# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### FargateRunner <a name="FargateRunner" id="fargate-runner.FargateRunner"></a>

#### Initializers <a name="Initializers" id="fargate-runner.FargateRunner.Initializer"></a>

```typescript
import { FargateRunner } from 'fargate-runner'

new FargateRunner(scope: Construct, id: string, props: FargateRunnerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#fargate-runner.FargateRunner.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#fargate-runner.FargateRunner.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#fargate-runner.FargateRunner.Initializer.parameter.props">props</a></code> | <code><a href="#fargate-runner.FargateRunnerProps">FargateRunnerProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="fargate-runner.FargateRunner.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="fargate-runner.FargateRunner.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="fargate-runner.FargateRunner.Initializer.parameter.props"></a>

- *Type:* <a href="#fargate-runner.FargateRunnerProps">FargateRunnerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#fargate-runner.FargateRunner.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="fargate-runner.FargateRunner.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#fargate-runner.FargateRunner.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="fargate-runner.FargateRunner.isConstruct"></a>

```typescript
import { FargateRunner } from 'fargate-runner'

FargateRunner.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="fargate-runner.FargateRunner.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#fargate-runner.FargateRunner.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#fargate-runner.FargateRunner.property.waitConditionHanlderEndpoint">waitConditionHanlderEndpoint</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="fargate-runner.FargateRunner.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `waitConditionHanlderEndpoint`<sup>Required</sup> <a name="waitConditionHanlderEndpoint" id="fargate-runner.FargateRunner.property.waitConditionHanlderEndpoint"></a>

```typescript
public readonly waitConditionHanlderEndpoint: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### FargateRunnerProps <a name="FargateRunnerProps" id="fargate-runner.FargateRunnerProps"></a>

#### Initializer <a name="Initializer" id="fargate-runner.FargateRunnerProps.Initializer"></a>

```typescript
import { FargateRunnerProps } from 'fargate-runner'

const fargateRunnerProps: FargateRunnerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#fargate-runner.FargateRunnerProps.property.fargateTaskDef">fargateTaskDef</a></code> | <code>aws-cdk-lib.aws_ecs.TaskDefinition</code> | *No description.* |
| <code><a href="#fargate-runner.FargateRunnerProps.property.count">count</a></code> | <code>number</code> | *No description.* |
| <code><a href="#fargate-runner.FargateRunnerProps.property.timeout">timeout</a></code> | <code>string</code> | *No description.* |
| <code><a href="#fargate-runner.FargateRunnerProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |

---

##### `fargateTaskDef`<sup>Required</sup> <a name="fargateTaskDef" id="fargate-runner.FargateRunnerProps.property.fargateTaskDef"></a>

```typescript
public readonly fargateTaskDef: TaskDefinition;
```

- *Type:* aws-cdk-lib.aws_ecs.TaskDefinition

---

##### `count`<sup>Optional</sup> <a name="count" id="fargate-runner.FargateRunnerProps.property.count"></a>

```typescript
public readonly count: number;
```

- *Type:* number

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="fargate-runner.FargateRunnerProps.property.timeout"></a>

```typescript
public readonly timeout: string;
```

- *Type:* string

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="fargate-runner.FargateRunnerProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---




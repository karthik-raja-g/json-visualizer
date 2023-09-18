import { Handle, Position } from "reactflow";
import styled from "styled-components";
// import { Node } from "./Node";

const Node = styled.div`
  width: 250px;
  padding: 10px;
  background-color: aliceblue;
  border-radius: 4px;
  text-align: center;
  &:hover {
    background-color: aquamarine;
  }
`;

const NodeTitle = styled.h3`
  font-weight: 500;
`;
const DataGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  border: 1px solid green;
`;
const Key = styled.p`
  margin: 0;
  font-weight: 500;
  color: blue;
`;
const Value = styled.p`
  margin: 0%;
  color: green;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function getContent(data = {}) {
  if (data.title) {
    return <NodeTitle>{data.title}</NodeTitle>;
  }
  const keys = Object.keys(data);
  return (
    <Container>
      {keys.map((key,i) => (
        <DataGrid key={i}>
          <Key>{key}:</Key>
          <Value>{String(data[key])}</Value>
        </DataGrid>
      ))}
    </Container>
  );
}

function CustomNode(props) {
  const { targetPosition, sourcePosition, data } = props;
  return (
    <Node>
      <Handle position={Position[targetPosition]} type="target" />
      {getContent(data)}
      {/* {JSON.stringify(data)} */}
      <Handle position={Position[sourcePosition]} type="source" />
    </Node>
  );
}

export default CustomNode;

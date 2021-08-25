import React from 'react';
import './FlowDFD.css';
import ReactFlow, { Background, MiniMap, Controls } from 'react-flow-renderer';
import ErrorBox from '../ErrorBox/ErrorBox';
import angryEmoji from '../assets/angryEmoji.gif'
import loadingEmoji from '../assets/loadingface.gif'
class FlowDFD extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        elements: [],
        id:props.match.params.id,
        loaded:false,
        message:"",
      };
    }
    componentDidMount() {
      fetch(`http://localhost:3001/api/v1/get-data-flow/${this.state.id}`)
        .then(res => {
          return res.json()
        })
        .then(
          (result) => {
            (result.success)?
            this.setState({
              elements: result.data,
              loaded:true,
            }):
            this.setState({
              elements: [],
              loaded:true,
              message:result.message
            });
          },
          (error) => {
            console.log(error);
            });
      }
  
    render() {
      return (
      <div style={{ height: '95vh',width:'100%' }} className="dfd-flow-box">
      {
        (this.state.loaded===false)?
          <ErrorBox message="Fetching Data" emoji={loadingEmoji}/>
          :
          (this.state.message!=="")?
            <ErrorBox message={this.state.message} emoji={angryEmoji}/>
            :
            <ReactFlow elements={this.state.elements}>
                <Background
                variant="dots"
                gap={20}
                size={1}
                style={{backgroundColor:'#1F1D2B'}}
              />
                <MiniMap
                nodeColor={(node) => node.style.backgroundColor}
                nodeStrokeWidth={1}
              />
                <Controls />
            </ReactFlow>
      }
          
      </div>
      )
    }
  }
  export default FlowDFD;
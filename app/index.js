import React from "react";
import ReactDOM from "react-dom/client";

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        
        }
    }
   render(){
    return(
        <div><h1>hello word1</h1></div>
    )
   }
}
const Root = ReactDOM.createRoot(document.getElementById('root'));
Root.render(<App/>)
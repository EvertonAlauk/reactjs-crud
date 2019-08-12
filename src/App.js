import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      title: "React CRUD",
      act: 0,
      index: "",
      datas: []
    }
  }

  componentDidMount(){
    this.refs.name.focus();
  }

  fsubmit = (e) => {
    e.preventDefault();

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;

    if (this.state.act === 0){
      datas.push({ name, address });
    }
    else {
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = address;
    }

    this.setState({
      datas: datas,
      act: 0
    })

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fremove = (index) => {
    let datas = this.state.datas;
    datas.splice(index, 1);
    this.setState({
      datas: datas
    });
    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fedit = (index) => {
    let data = this.state.datas[index];
    this.refs.name.value = data.name;
    this.refs.address.value = data.address;

    this.setState({
      act: 1,
      index: index
    })
  }

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="Nome" className="formField"/>
          <input type="text" ref="address" placeholder="Endereço" className="formField"/>
          <button onClick={(e)=>this.fsubmit(e)} className="myButton">Salvar</button>
        </form>
        <table className="table table-striped">
          <thead>
            <tr>
              <td width="30%">Nome</td>
              <td width="50%">Endereço</td>
              <td width="10%"></td>
              <td width="10%"></td>
            </tr>
          </thead>
          <tbody>
          {datas.map((data, index) =>
            <tr key={index}>
              <td width="30%">{data.name}</td>
              <td>{data.address}</td>
              <td><button onClick={()=>this.fremove(index)} className="myButtonList">remover</button></td>
              <td><button onClick={()=>this.fedit(index)} className="myButtonList">editar</button></td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;

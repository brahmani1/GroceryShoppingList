import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const _ = require('lodash');

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toBuy: [],
      inCart: [],
      message: '',
      messageColor: 'blue'
    }
  }

  onSubmit(e) {
    // Get the value from the input ref
    let value = this.groceryName.value;
    if(!_.isEmpty(value) && this.onValid(value)) {
      let toBuy = this.state.toBuy;
      toBuy.push(this.groceryName.value);
      this.groceryName.value = '';
      this.setState({ toBuy })
    }
  }

  onValid(value) {
    //
    let items = _.union(this.state.toBuy, this.state.inCart)
    if(items.indexOf(value) === -1 ) {
      this.setState({ messageColor: 'blue', message: 'Adding ' + value + ' to buy items list'})
      return true
    } else {
      this.setState({ messageColor: 'red', message: 'Item already exists'})
      return false
    }
  }

  onChangeToCart(e) {
    let value = e.target.attributes.getNamedItem('data-value').value;
    let toBuy = _.pull(this.state.toBuy, value);
    let inCart = this.state.inCart;
    inCart.push(value);
    this.setState({ toBuy, inCart, message: 'Moving Item to Cart', messageColor: 'orange' })
  }

  onChangeToBuy(e) {
    let value = e.target.attributes.getNamedItem('data-value').value;
    let inCart = _.pull(this.state.inCart, value);
    let toBuy = this.state.toBuy;
    toBuy.push(value);
    this.setState({ toBuy, inCart, message: 'Moving Item to Cart', messageColor: 'orange' })
  }

  renderToBuyElements(list) {
    return _.map(list, (e) => {
      return <li key={e}>
          {e}
          <button data-value={e} style={{ marginLeft: '10px' }} onClick={(e) => this.onChangeToCart(e)}>Move To Cart</button>
        </li>
    })
  }
  
  renderInCartElements(list) {
    return _.map(list, (e) => {
      return <li key={e}>
        {e} 
        <button data-value={e} style={{ marginLeft: '10px' }} onClick={(e) => this.onChangeToBuy(e)}>Move To Buy</button>
      </li>
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Grocery</h1>
        </header>
        <br/>
        <p>
          <span style={{color: this.state.messageColor }}>{this.state.message}</span>
        </p>
        <input type="text" style={{ padding: '10px 20px', borderRadius: '4px' }} ref={input => this.groceryName = input}/>
        <button style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: 'lightgray' }} onClick={(e) => this.onSubmit(e)}>Submit</button>
        <h3>To Buy List ({this.state.toBuy.length || 0})</h3>
        {
          this.state.toBuy.length > 0 ?
          <ul>{this.renderToBuyElements(this.state.toBuy)}</ul> : <p>Empty</p>
        }
        
        <h3>In My Cart List ({this.state.inCart.length || 0})</h3>
        {
          this.state.inCart.length > 0 ?
          <ul>{this.renderInCartElements(this.state.inCart)}</ul> : <p>Empty</p>
        }
        
      </div>
    );
  }
}

export default App;

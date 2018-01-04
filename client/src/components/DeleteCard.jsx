import React from 'react';
import PropTypes from 'prop-types';

class DeleteCard extends React.Component {
  constructor() {
    super();
    this.state = {
      word: '',
      description: '',
      id:'',
      showError: false
    }
  }
    
  hideError() {
    this.setState({showError: !this.state.showError});
  }


  componentWillMount() {
    this.setState({word: this.props.card.frontContent,
              description: this.props.card.backContent,
              id: this.props.card.id
            });
  }
  
  render() {
    const errorMessage = this.state.showError ? 'Please fill in the word and description!' : '';
    var Immutable = require('immutable');


    return (
      <div className='create-card'>
        <div 
          className='create-card__shadow'
          onClick={() => {
            this.props.onShadowClick();
          }}
        >
        </div>
        <div className='create-card__body'>
          <h1>Confirm Delete Flash Card?</h1>
          <div className='create-card__input-wrapper'>
            <input 
              id='word' 
              placeholder="Word i.e. 'React'"
              value = {this.state.word}
              onChange = {(e) => this.setState({word: e.target.value}) }
            />
            <input 
              id='description' 
              placeholder="Description i.e. 'A front end js framework.'"
              value = {this.state.description}
              onChange = {(e) => this.setState({description: e.target.value})}
            />
            <br/>
            <button 
              id='create-card__button'
              onClick={() => {
               
                if (this.state.word.length === 0 || this.state.description.length === 0) {
                  this.setState({showError: !this.state.showError});
                  setTimeout(() => this.hideError(), 2000);
                } else {
                  this.props.onShadowClick();
                  const word = new Immutable.Map({
                            word: this.state.word, 
                            description: this.state.description,
                            id:this.props.card.id
                         });
                  this.props.onDeleteCard(word); 
                }
              }}
            >
                Delete!
            </button>
            <div className='create-card__error'>
              {errorMessage}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteCard;
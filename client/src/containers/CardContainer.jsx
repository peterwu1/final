import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../modules/Auth';
import Card from '../components/Card.jsx';
import CreateCard from '../components/CreateCard.jsx';
import EditCard from '../components/EditCard.jsx';
import DeleteCard from '../components/DeleteCard.jsx';


class CardContainer extends React.Component {

  constructor() {
     const Immutable = require('immutable');
     const _ = require('lodash');
     const API_URL = 'http://localhost:3000';
    super();
    this.state = {
      cards: Immutable.fromJS([{
  
      }
    ]),
      errors: {},
      successMessage:'',
      cardNumber: 0
    };
    this.card;
    this.boundCallback = this.hideCreateCard.bind(this);
    this.boundCreateCard = this.setCard.bind(this);
    this.boundEditCard = this.editCard.bind(this);
    this.boundDeleteCard = this.deleteCard.bind(this);
    this.boundShowPrevCard = this.showPrevCard.bind(this);
    this.boundShowNextCard = this.showNextCard.bind(this);
  }
  
  componentWillMount() {

    // const word = "Some Vocab 3";//encodeURIComponent(card.word);
    // const description = "Description of anything Here"//encodeURIComponent(card.description);
    // const email = encodeURIComponent("peter@gmail.com");
    // const formData = `word=${word}&description=${description}&email=${email}`;
    var Immutable = require('immutable');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/cards');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {

         const newCards = new Immutable.fromJS(xhr.response.cards);
         console.log(newCards);
         this.setState({cards: newCards});
      }
    });
    xhr.send();

  }
  

  hideCreateCard() {
    this.setState({showModal: false,showEdit:false, showDelete: false});
  }
  
  showNextCard() {
    if ((this.state.cardNumber + 1) !== this.state.cards.size) {
      this.setState({cardNumber: this.state.cardNumber += 1});
    }
  }
  
  showPrevCard() {
    if (this.state.cardNumber !== 0) {
      this.setState({cardNumber: this.state.cardNumber -= 1});
    }
  }

  deleteCard(card) {
    console.log("delete");
    const id = encodeURIComponent(card.get('id'));
    const formData = `id=${id}`;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/api/card');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
         const tempCard = this.state.cards.removeIn([this.card.cardNumber]);
         this.setState({cards: tempCard, cardNumber: this.state.cardNumber -= 1});
      }
    });
    xhr.send(formData);
  }

  editCard(card) {
    const word = encodeURIComponent(card.get('word'));
    const description = encodeURIComponent(card.get('description'));
    const email = encodeURIComponent("peter@gmail.com");
    const id = encodeURIComponent(card.get('id'));
    const formData = `word=${word}&description=${description}&email=${email}&id=${id}`;

    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', '/api/card');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
         const tempCard = this.state.cards.setIn([this.card.cardNumber,'word'],card.get('word'));
         const tempCard2 = tempCard.setIn([this.card.cardNumber,'description'],card.get('description'));

         this.setState({cards: tempCard2});
      }
    });
    xhr.send(formData);

  }
  
  setCard(card) {
    const word = encodeURIComponent(card.get('word'));
    const description = encodeURIComponent(card.get('description'));
    const email = encodeURIComponent("peter@gmail.com");
    const formData = `word=${word}&description=${description}&email=${email}`;
    // console.log(formData);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/card');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const tempCard = card.setIn(['_id'],xhr.response._id);
        const newCards = this.state.cards.push(tempCard);
        this.setState({cards: newCards});
      }
    });
    xhr.send(formData);

    
  }
  
  generateDots() {
    const times = this.state.cards.size;
    let arr = [];
    _.times(times).forEach((num) => {
      const dotClass = num  === this.state.cardNumber ? 'active' : '';
      arr.push(
        <span 
          key={num}
          className={`card-container__dot fa fa-circle ${dotClass}`}
          onClick={() => this.setState({cardNumber: num})}
        />
      )
    });
    return arr;
  }
  
  generateCards() {
    const cards = this.state.cards;
     const cardsList = cards.map((card) => {
        return (
          <Card 
            frontContent={card.get('word')}
            backContent={card.get('description')}
            id={card.get('_id')}
            showNextCard={this.boundShowNextCard}
            showPrevCard = {this.boundShowPrevCard}
            cardNumber={this.state.cardNumber}
          />
          );
      });

     this.card = cardsList.toJS()[this.state.cardNumber].props;
     console.log(this.card);
     return(cardsList.toJS()[this.state.cardNumber]); 
  }
  render() {
    return (
      <div>
        <div className="header">
        <div className='header-content header-content__left'>
          
        </div>
        <div className='header-content header-content__middle'>
          Flash Cards
        </div>
        <div className='header-content header-content__right'>
          <span 
            className='card-container__icon fa fa-pencil-square-o' 
            onClick={() => {
              this.setState({showEdit: !this.state.showEdit});
            }}
          />
          <span 
            className='card-container__icon fa fa-plus' 
            onClick={() => {
              this.setState({showModal: !this.state.showModal});
            }}
          />
          <span 
            className='card-container__icon fa fa-trash-o' 
            onClick={() => {
              this.setState({showDelete: !this.state.showDelete});
            }}
          />

        </div>
        </div>
        
        {this.state.showModal 
          ? <CreateCard 
              onShadowClick={this.boundCallback}
              onCreateCard={this.boundCreateCard}
 
            /> 
          : ''}

        {this.state.showEdit 
        ? <EditCard 
            onShadowClick={this.boundCallback}
            onEditCard={this.boundEditCard }
            card={this.card}
          /> 
        : ''}

        {this.state.showDelete 
          ? <DeleteCard 
              onShadowClick={this.boundCallback}
              onDeleteCard={this.boundDeleteCard }
              card={this.card}
            /> 
          : ''}

        {this.generateCards()}
        <div className='card-container__dots-wrapper'>
          {this.generateDots()}
        </div>
      </div>
   );
  }
}

export default CardContainer;
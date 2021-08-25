
import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import './Menu.css';
import MenuHeader from '../MenuHeader';
import SearchBar from '../SearchBar/SearchBar';
import ErrorBox from '../ErrorBox/ErrorBox';
import sadEmoji from '../assets/frowning_face.gif';
import loadingEmoji from '../assets/loadingface.gif';
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          cards: [],
          cardsDefault: [],
          searchText: "",
          loaded:false,
        };
        this.filterFunction=this.filterFunction.bind(this);
        this.updateInput=this.updateInput.bind(this);
      };
      filterFunction(interaction,inputText){
        return (
          interaction.label.toLowerCase().includes(inputText.toLowerCase()) 
          || 
          (interaction.id!==null &&  interaction.id.toString().includes(inputText.toLowerCase()))
          ||
          (interaction.context!==null && interaction.context.toString().includes(inputText.toLowerCase()))
          );
      }
      updateInput(inputText) {
        this.setState({searchText:inputText});
        console.log(inputText)
        const filteredInteractions = this.state.cardsDefault.filter(interaction => this.filterFunction(interaction,inputText));
        this.setState({cards:filteredInteractions});
  
      }
      componentDidMount() {
        fetch("http://localhost:3001/api/v1//get-all-card-interaction/")
          .then(res => {
            return res.json()
          })
          .then(
            (result) => {
              // console.log(result.data)
              this.setState({
                cards: result.data,
                cardsDefault:result.data,
                loaded:true,
              });
            },
            (error) => {
              console.log(error);
              });
        }  
  render() {
    return (
      <div className="menu">
      <SearchBar value={this.state.searchText} updateInput={this.updateInput}/>
      <MenuHeader/>
    {   
      (this.state.cards.length!==0)?
      this.state.cards.map((card) => {
            return <MenuItem key={card.id} data={card}/>
        })
      :( 
        this.state.loaded===false?<ErrorBox message="Fetching Data" emoji={loadingEmoji}/>:<ErrorBox message="No Matching Results!" emoji={sadEmoji}/>
        )
      
    }
      </div>
    )
  }
}
export default Menu;

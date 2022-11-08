import React, {useState} from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/Config';
import { useLastQuery } from '../misc/custom-hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';
import CustomRadio from '../components/CustomRadio';


const Home = () => {
   const [input ,setInput] =useLastQuery('');
   const [results , setResults] = useState(null);
   const [searchOption,setSearchOptions] = useState('shows');
   
   const isShowSearch = searchOption === 'shows';
 
   
const onSearch = () => {
  apiGet(`/search/${searchOption}?q=${input}`).then(result =>{
    setResults(result);
  });
  };

const onInputChange= ev => {
setInput(ev.target.value)
}

const onKeyDown = (ev) => {
  if(ev.keyCode === 13){
    onSearch();
  }
};

const onRadioChange = (ev) =>{
 setSearchOptions(ev.target.value)
}
console.log(searchOption);



const renderResults = () => {
  if(results && results.length === 0){
    return <div>No results</div>

  }

  if(results && results.length > 0)
  {
    return results[0].show ?<ShowGrid data ={results} /> : <ActorGrid data = {results}/>
    
  
  }

   return null;

}

return <MainPageLayout>
    <SearchInput
     type="text"
     placeholder="Search for Something"
      onChange={onInputChange}
       onKeyDown ={onKeyDown}
         value={input}
          />
         <RadioInputsWrapper>
          <div>
           <CustomRadio 
            label="Shows"
            id="shows-search"
            value="shows" 
            onChange={onRadioChange}
            checked = {isShowSearch}
          />
            </div>
            
            <div>
            <CustomRadio 
              label="Actors"
              id='actors-search'
              value="people"
              onChange={onRadioChange}
              checked = {!isShowSearch}
             />
            </div>
          </RadioInputsWrapper>

      <SearchButtonWrapper>
       <button type="button"
        onClick={onSearch}>Search</button>
    </SearchButtonWrapper>
      {renderResults()}
  </MainPageLayout>
  };

export default Home

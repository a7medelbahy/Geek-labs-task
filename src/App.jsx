import './App.css';
import { ProjetData } from './data';
import { useEffect,useRef,useState } from 'react';

function App() {
const [items,setItems] = useState(ProjetData);

  const contentDesc = document.querySelectorAll('.content');
  var slideCount = 0;
  contentDesc.forEach((content,index) => {
    content.style.left = `${index * 100}%`
});
  const mainImage = useRef(null);
  useEffect(()=>{
    
sliding();
setItems(ProjetData.filter(item=>{return item.id !== slideCount+1}))
  },slideCount)
  


function sliding (){
  
  if (slideCount === contentDesc.length){
      slideCount = 0;
  } else if (slideCount < 0){
      slideCount = contentDesc.length -1;
  }
  contentDesc.forEach(element => {
     element.style.transform = `translateX(-${slideCount*100}%)` 
  });
  mainImage.current.src = ProjetData[slideCount].img;
}

const slidIncrease = () => {
  slideCount++;
  sliding();
}
const slideDecrease = () =>{
  slideCount--;
  sliding();
}

  return (
    <div className="App d-flex jsutify-content-start gap-5 align-items-center">
        <div className='slider-container h-100 d-flex justify-content-start align-items-start gap-3'>

          {items.slice(0,5).map(item=>{
            return (
              <div key={item.id} className='h-100'>
                  <div className='slider-img overflow-hidden'>
            <img src={item.img} className='img-fluid h-100 w-100 d-block' alt="slide" />
          </div>
              </div> 
            )
          })}
          <div className='slider-img slider-img-main overflow-hidden'>
            <img ref={mainImage} src={mainImage || ProjetData[slideCount].img} className='img-fluid h-100 w-100 d-block' alt="slide1" />
          </div>
          <div className='slider-img overflow-hidden'>
            <img src={ProjetData[ProjetData.length-1].img} className='img-fluid h-100 w-100 d-block' alt="slide1" />
          </div>
        </div>
      <div className='slider-content text-center'>
        {ProjetData.map((item)=> {
          return (
              <div key={item.id}>
                <div className='content'>
                <h3 className='text-white'>{item.projectName}</h3>
                <p className='text-white-50'>{item.desc}</p>
                </div>
              </div> 
          )
        })}
      <button onClick={slidIncrease} className='bg-transparent fs-4 next-btn text-white'><i className="fa-solid fa-angle-right"></i></button>
      <button onClick={slideDecrease} className='bg-transparent fs-4 prev-btn text-white'><i className="fa-solid fa-angle-left"></i></button>
      </div>

    </div>
  );
}

export default App;

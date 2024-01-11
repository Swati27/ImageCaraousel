import React, {useState, useEffect} from 'react'

const data = ['https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg', 'https://images.unsplash.com/photo-1509043759401-136742328bb3?ixlib=rb-4.0.3', 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg', 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630'];

function ImageSlider() {
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            getNextImage();
        }, 5000)
        return () => clearTimeout(timer);
    },[imageIndex]);

    const imgDisplay = (i) => {
        return imageIndex === i ? 'block' : 'hidden';
    }

    const getPreviousImage = () => {
        if(imageIndex != 0)
     setImageIndex(imageIndex - 1);
    else
    setImageIndex(data.length -1);
    }

    const getNextImage = () => {
        if(imageIndex != data.length -1)
        setImageIndex(imageIndex + 1);
        else
        setImageIndex(0);
    }

  return (
    <div>
        <button style={{margin: '10px', padding: '4px'}} onClick={()=> getPreviousImage()}>Previous</button>
        {data.map((url,i)=>{
    return  <img key = {url} style = {{width: '500px', height: '500px', display: imgDisplay(i)}} src = {url} alt='wallpaper'></img>
    })}
        <button style={{margin: '10px', padding: '4px'}} onClick={()=> getNextImage()}>Next</button>
    </div>
  )
}

export default ImageSlider;

//if we dont render all images I mean just 1 image network tab will make the call even for the images that are already loaded
// which means each time component loads new image tag is created which makes another ntw call and the previous one is gone
// so even if older imgae comes new api calls are made
// How to fix above?
// We can render all images onto DOM and can just show and hide with help of index
// so use map to render to all images so we will make className of img dynamic

// Dynamic style not working

// How else can you optimize your app?
// Optimization can happen at different level - Javascript, CSS, images, other resources
// Img optimzation -> you can compress the image and can load it from CDN - content deleivery network
// CDN load image faster, it can cache image are fatser than random servers for ex - Maazon S3 buckets
// we can also compress the image

// Can you build a feature where slider automatically slides after 5 sec??

// useEffect is called after render
// we should also clear the setTimeOut so for that we can return a cleanup function from useEffect
// we should clear existing timeout before creating new time out otherwise you will see weird timeout behavior
// cleanUp is mandatory, not optional
// Lifecycle of react component - component creates, mounts, updates, umounts.
// render then useEffect
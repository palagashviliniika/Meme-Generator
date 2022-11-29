import React, {useEffect, useState} from 'react'

export default function Meme() {
    const [allMemes, setAllMemes] = useState([])
    
    const [Meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        memeImg: "https://i.imgflip.com/30b1gx.jpg"
    })

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(data => setAllMemes(data.data.memes))
      }, [])

      function changeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            memeImg: url
        }))
      }

      function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
      }

      console.log(Meme);
    

  return (
    <main>
        <div className="form">
            <input 
                type="text" 
                placeholder='Top Text'
                name='topText'
                onChange={handleChange}
                value={Meme.topText}
            />
            <input 
                type="text" 
                placeholder='Bottom Text'
                name='bottomText'
                onChange={handleChange}
                value={Meme.bottomText}
            />
            <button onClick={changeImage}>Get a new meme image</button>
        </div>
        <div className="meme">
            <img src={Meme.memeImg} alt="Meme Image" />
            <h2 className='meme--text top'>{Meme.topText}</h2>
            <h2 className='meme--text bottom'>{Meme.bottomText}</h2>
        </div>
    </main>
  )
}

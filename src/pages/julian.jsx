
import React, { useState, useEffect, useRef } from 'react';
import Transition from '../composants/transition';
import { useNavigate } from 'react-router-dom';
import logo from '../images/aiji2.png';
import bg from '../images/fond.jpg';
import MySlider from '../composants/Slider';
import { useParams } from 'react-router-dom';
import { db } from '../tools/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';




function Julian() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const imageRefs = useRef([]);
  const [artistes, setArtistes] = useState([]);
  const [document, setDocument] = useState();
  const navigate = useNavigate();
  const [transition, setTransition] = useState(false);
  const [newTransition, setNewTransition] = useState(true); // Replace these with your image URLs


  useEffect(() => {
    // Simulate a network request to fetch your content
    // Replace this with your actual loading logic
    const timer = setTimeout(() => {
      setNewTransition(false);
    }, 600); // 3 seconds

    // Clean up the timer on unmount
    return () => clearTimeout(timer);
  }, []);//


  async function makeTransition(path) {
    setTransition(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    navigate(path);
  }

  if (newTransition) return <Transition />
  return (
    <div className="w-screen bg-cover relative">
      <div className='flex lg:flex-row flex-col  w-screen absolute'>
        <div className='w-full h-sceen bg-cover' style={{ backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/website-julian.appspot.com/o/aboutme%2F2---Grande.jpg?alt=media&token=be4fe7ca-5bd5-4723-b5e5-f4de555c0958")` }}>
        </div>
        <div className='w-full h-screen bg-cover' style={{ backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/website-julian.appspot.com/o/aboutme%2FCapture-d%E2%80%99e%CC%81cran-2023-05-31-a%CC%80-22.13.44---Grande.jpg?alt=media&token=9fa8b88c-2d3d-4417-9741-8234364f826b")` }}>
        </div>
      </div>
      <div className='h-32 w-full relative md:px-20 px-4 flex  items-start z-10 pt-10'>
        <div className='w-full items-center flex justify-between'>
          <div className='md:w-40 w-20  relative' onClick={() => { navigate("/") }}>
            <img src={logo} className=" object-cover custom-cursor" />
          </div>
          <div className='relative flex gap-10'>
            <h1 className='text-black md:text-[30px] text-[20px] font-helvetica font-semibold custom-cursor select-none' onClick={() => { navigate("/projets") }}>WORKS</h1>
            <h1 className='text-black md:text-[30px] text-[20px] font-bold select-none font-helvetica custom-cursor' onClick={() => { navigate("/aboutMe") }}>ABOUT ME</h1>
          </div>
        </div>
      </div>

      <div className='relative flex lg:flex-row flex-col justify-center mt-12'>
        <div className="flex">
          <div className="flex justify-start">
            <div className="w-1/2 text-black px-10 text-lg relative font-avenir text-justify">
              <p><span className="font-bold text-xl">Crayon, </span><br /> <br />
                En tant qu’écrivain, on considère le crayon comme l’unique fidèle. Cet outil, nous suit partout où qu’on aille, dans tout les moments, dans chaque étapes de vie, chaque lignes. Le temps passe et la trace qu’il laisse est plus qu’un simple trait, c’est l’his- toire. Un crayon a une histoire, une vie et on peut tout aussi bien la liée à la notre. Ces quelques lignes vont justement aborder ce lien et ce parallèle. Un parallèle com- mençant dans celui qui en fait mauvais usage. Le crayon neuf, tout récent, fraîche- ment née, peut être détruit. On peut le casser à de multiples occasions, on peut le forcer à écrire et l’user jusqu’à appuyer pour qu’il se rétrécisse sous l’impuissance de notre force. Le mal est dans toutes les mains qui ne savent pas faire usage du crayon. Chaque crayon à son écrivain, celui-ci est l’unique à pouvoir faire ressortir le meilleur de ce crayon. Malheureusement, avant que l’écriture et l’écrivain se rencontrent, il faut du temps, laissant le crayon entre de mauvaise mains. C’est entre ces mains qu’il se raccourcit, se casse et devient de moins en moins accessible au mains d’autrui. Jusqu’au moment où il tombe de les mains de celui qui va en faire l’usage de la plus belle des manières. L’histoire du crayon est un parallèle à celui de nos coeurs, de nos vies. On a beau passer par le pire, un jour on rencontrera ceux qui nous ferons vivre le meilleur et qui nous ferons sentir ce que l’on est vraiment. Un texte en symbiose entre un crayon et un écrivain. Un parallèle ä cette créativité que j’ai découvert et où ma plume ne cesse de s’éguisser.
                <br /> <br />En y croyant et en osant, on ne peut pas garantir la réussite. Mais en arrêtant d’y croire, on peut garantir que ça échouera alors pourquoi ne pas essayer ?</p><br />
              <p className='text-end font-bold italic'>AIJI</p>
            </div>
            <div className="w-1/2  text-white px-10 text-lg relative font-avenir text-justify flex items-end">
              <p className='leading-[1.3] pl-10'><span className='text-2xl font-bold font-helvetica'>JULIAN AGUILAR</span><br />16.11.1998<br />SUISEE - ESPAGNOL<br />FROM GENEVA</p>
            </div>
          </div>
        </div>
      </div>
      <div className='relative w-full md:px-20 pt-20 px-4'>
        <div className='flex flex-row justify-between font-avenir lg:text-2xl md:text-[20px] text-[11px]'>
          <div className='text-black font-extralight'>
            <h2 className='select-none'>
              AIJI © 2023. Site web
            </h2>
          </div>
          <div className='text-black font-extralight flex flex-row gap-2'>
            <a className='custom-cursor' href="https://www.instagram.com/julian.aglr/">IG.</a>
            <a className='custom-cursor' href="https://www.linkedin.com/in/julianaglr/">LIN.</a>
            <a className='custom-cursor' href="tel:+41764422516">TEL.</a>
            <a className='custom-cursor' href="mailto:julian.aglr.alrc@gmail.com">MAIL.</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Julian;

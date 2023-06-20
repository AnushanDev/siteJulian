import logo from '../images/aiji.png'

import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { db } from '../tools/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';



function DetailProjet() {

  const [document, setDocument] = useState();

  const { categoryName, detail } = useParams();
  const [transition, setTransition] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  console.log(detail);
  async function makeTransition(path) {
    setTransition(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    navigate(path);
  }
  const fetchData = async () => {
    const q = query(collection(db, categoryName.toLowerCase()), where("slug", "==", detail));

    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map(doc => doc.data());
    console.log(docs);
    setDocument(docs[0]);
  };

  if (document == null) return <h1>chargement...</h1>
  return (
    <div className="bg-white min-h-screen ">
      <div className="w-screen h-screen bg-cover" style={{ backgroundImage: `url("${document.image_background}")` }}>
        <div className='h-32 w-full relative px-20 flex justify-between items-center z-10'>
          <div className='h-32 w-full relative px-20 flex justify-between items-center z-10'>
            <div className='h-full w-40 relative custom-cursor' onClick={() => { makeTransition("/") }}>
              <img src={logo} className=" object-cover" />
            </div>
            <div className='relative flex gap-10'>
              <h1 className='text-black text-[30px] font-helvetica font-semibold custom-cursor select-none' onClick={() => { makeTransition("/projets") }}>WORKS</h1>
              <h1 className='text-black text-[30px] font-bold select-none font-helvetica custom-cursor' onClick={() => { makeTransition("/aboutMe") }}>ABOUT ME</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#3E3B3B] h-[680px] w-full px-12 pt-5">
        <div className="text-white font-light flex flex-row justify-between font-forma mb-16">
          <div className="flex gap-20">
            <div className="flex gap-1">
              <p>{document.type_profil.toUpperCase()} : </p>
              <p className="font-semibold">{document.nom.toUpperCase()}</p>
            </div>
            <div className="flex gap-1">
              <p>{document.type_travail.toUpperCase()} : </p>
              <p className="font-semibold">JULIAN AGUILAR</p>
            </div>
          </div>
          <div className="flex gap-1">
            <p>ANNEE : </p>
            <p className="font-semibold">{document.annee}</p>
          </div>
        </div>
        <div className="flex justify-end">

          <div className="w-[600px] h-[500px]  text-white px-10 font-forma text-xl">
            <p>{document.description}</p>
            <p className="font-semibold"><br /> <br />{document.type_travail_complet.toUpperCase()}</p>
          </div>

        </div>
      </div>

      <div className='w-screen h-screen relative flex justify-center'>
        <div className='flex w-screen h-screen absolute'>
          <div className='w-full h-screen bg-cover' style={{ backgroundImage: `url("https://images.unsplash.com/photo-1465151990534-683bf7717c78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1157&q=80")` }}>
          </div>
          <div className='w-full h-sceen bg-cover' style={{ backgroundImage: `url("https://images.unsplash.com/photo-1603544423794-fd915dda1f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80")` }}>
          </div>
        </div>
        <div className="flex flex-col">

          <h1 className='relative italic text-white text-center items-center text-[200px] h-fit select-none font-black pt-10' >PHOTOGRAPHIE</h1>
          <div className="flex justify-start">
            <div className="w-[600px] h-[500px]  text-white px-10 font-forma text-xl relative">
              <p>{document.description}</p>
            </div>

          </div>
        </div>
      </div>
      <div className="w-screen h-screen bg-cover flex justify-center items-center" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1555432384-3b2fa7b650c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80")` }}>

        <div className="w-[710px] h-[390px] text-white text-center font-forma text-xl">
          <p>Il revient sur un certain nombre de décisions de Théodose II, notamment dans les relations avec Attila ou en matière religieuse. Il révoque les concessions faites aux Huns, notamment le paiement du tribut et, en 452, Attila pille l'Italie alors que l'Empire romain d'Occident est en pleine déliquescence. Marcien réagit par l'envoi de troupes au-delà du Danube, battant les Huns sur leurs propres terres. Attila, dont les troupes souffrent de la famine, se retire d'Italie en échange d'un important tribut versé par l'Empire d'Occident. <br /> <br /> Après la mort d'Attila en 453, Marcien profite de la dislocation de l'Empire hunnique en plusieurs royaumes rivaux pour en faire des alliés des Romains au travers d'un fœdus.</p>
        </div>
      </div>

    </div>
  );
}

export default DetailProjet;

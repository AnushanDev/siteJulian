import logo from '../images/aiji2.png'
import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { db } from '../tools/firebase';
import { and, collection, getDocs, query, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import bg from '../images/fond.jpg';
import ImageComponent from '../composants/imageSize';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { async } from '@firebase/util';


const Todo = () => {
    const [lightboxVisible, setLightboxVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [document, setDocument] = useState();
    const navigate = useNavigate();
    const [transition, setTransition] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const monArry = Array.from({ length: 20 }, (_, i) => i + 1);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchImages = async (monStorage) => {
        const storage = getStorage();
        const folderRef = ref(storage, monStorage); // change 'your-folder-name' to the name of your folder
        listAll(folderRef)
            .then((res) => {
                let urls = [];
                res.items.forEach((itemRef) => {
                    // And finally display them
                    getDownloadURL(itemRef).then((url) => {
                        urls.push(url);
                        setImageUrls((prevUrls) => [...prevUrls, url]);
                    });
                });
            },
            )
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };

    const openLightbox = (image) => {
        setSelectedImage(image);
        setLightboxVisible(true);
    };

    const closeLightbox = () => {
        setLightboxVisible(false);
    };

    async function makeTransition(path) {
        setTransition(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate(path);
    }
    const fetchData = async () => {
        //const q = query(collection(db, categoryName.toLowerCase()), where("slug", "==", detail));
        const q = query(collection(db, "football"), where("slug", "==", "ServetteFC"));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => doc.data());
        setDocument(docs[0]);
        await fetchImages(docs[0].storage);
    };

    function removeDuplicatesAndSort(arr) {
        let uniqueArr = [...new Set(arr)];
        let arraySansFiltres = [];
        let arrayOutput = [];
        uniqueArr.map((item, index) => {
            let dict = {}
            var element = item.split("%2F");
            var element2 = parseInt(element[1].split(".jpg")[0]);
            dict["position"] = element2;
            dict["item"] = item;
            arraySansFiltres.push(dict);
        })
        arraySansFiltres.sort((a, b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0))
        arraySansFiltres.map((item) => {
            arrayOutput.push(item["item"])
        })
        return arrayOutput;
    }



    async function makeTransition(path) {
        setTransition(true);
        localStorage.setItem('hasVisited', 'false');
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate(path);
    }
    const [projets, setProjets] = useState([]);

    function splitParagraph(description) {
        return description.split(" <br/> ");
    }


    if (document == null && imageUrls.length == 0) return <h1>chargement...</h1>
    return (
        <>
            <div style={{ backgroundImage: `url("${bg}")` }} className=' w-screen flex flex-col justify-between pb-10' >
                <div className='h-32 w-full px-20 flex justify-between items-center z-10'>
                    <div className='h-full w-40'>
                        <img src={logo} className=" object-cover" />
                    </div>
                    <div className='flex gap-10'>
                        <h1 className='text-black text-[30px] font-helvetica font-semibold custom-cursor select-none' onClick={() => { makeTransition("/projets") }}>WORKS</h1>
                        <h1 className='text-black text-[30px] font-bold select-none font-helvetica'>ABOUT ME</h1>
                    </div>
                </div>
                <div className='flex justify-center items-center my-20'>
                    <div className='w-4/6'>
                        <div className='mt-10 i my-20 gap-32 grid grid-cols-2 justify-items-center grid-flow-row'>
                            <div className='w-[500px] h-[500px] bg-[#D8D8D8] border bottom-2 border-black flex justify-center items-center'>
                                <img key={0}
                                    src={removeDuplicatesAndSort(imageUrls)[0]}
                                    alt="" className='max-w-[60%] max-h-[60%]'
                                    onClick={() => openLightbox(removeDuplicatesAndSort(imageUrls)[0])} />
                            </div>
                            <div className='w-[500px] h-[500px] bg-[#D8D8D8] border bottom-2 border-black flex justify-center items-end'>
                                <div className="w-full h-72">
                                    <h1 className="text-white font-bold font-futura text-[100px] italic pl-10">
                                        {document.nom}
                                    </h1>

                                </div>
                            </div>
                            <div className='w-[500px] h-[500px] bg-[#D8D8D8] border bottom-2 border-black flex justify-center items-center text-[25px] font-light font-avenir'>
                                <div>

                                    <div className="flex flex-col gap-1">
                                        <div className="flex gap-1">
                                            <h1>{document.type_travail} : </h1>
                                            <h1 className="font-semibold italic">AIJI</h1>
                                        </div>

                                        <div className="flex gap-1">
                                            <h1>{document.type_profil} : </h1>
                                            <h1 className="font-semibold italic">{document.nom}</h1>
                                        </div>

                                        <div className="flex gap-1">
                                            <h1>Projet : </h1>
                                            <h1 className="font-semibold italic">Score</h1>
                                        </div>

                                        <div className="flex gap-1">
                                            <h1>Date : </h1>
                                            <h1 className="font-semibold italic">{document.annee}</h1>
                                        </div>
                                    </div>
                                    <div className="mt-10">
                                        <h1 className="italic">{document.type_travail_complet}</h1>
                                    </div>

                                </div>
                            </div>
                            <div className='w-[500px] h-[500px] bg-[#D8D8D8] border bottom-2 border-black flex justify-center items-center'>
                                <img key={1}
                                    src={removeDuplicatesAndSort(imageUrls)[1]}
                                    alt="" className='max-w-[60%] max-h-[60%]'
                                    onClick={() => openLightbox(removeDuplicatesAndSort(imageUrls)[1])} />

                            </div>
                            <div className='w-[500px] h-[500px] bg-[#D8D8D8] border bottom-2 border-black flex justify-center items-center'>
                                <img key={2}
                                    src={removeDuplicatesAndSort(imageUrls)[2]}
                                    alt="" className='max-w-[60%] max-h-[60%]'
                                    onClick={() => openLightbox(removeDuplicatesAndSort(imageUrls)[2])} />
                            </div>
                            <div className='w-[500px] h-[500px] bg-[#D8D8D8] border bottom-2 border-black flex justify-center items-center text-[20px] font-light font-avenir'>
                                <div className="px-10">
                                    {splitParagraph(document.description).map((item, index) => {
                                        if (index == 0) {
                                            return <p className="font-bold">{item}<br /><br /></p>;
                                        }
                                        return <p className="">{item}<br /><br /></p>;
                                    })}
                                </div>
                            </div>
                            {removeDuplicatesAndSort(imageUrls).map((image, index) => {
                                if (index > 2) {
                                    return <div className='w-[500px] h-[500px] bg-[#D8D8D8] border bottom-2 border-black flex justify-center items-center'>
                                        <img key={index}
                                            src={image}
                                            alt="" className='max-w-[60%] max-h-[60%]'
                                            onClick={() => openLightbox(image)} />
                                    </div>
                                }
                            })}
                            <div className='w-[500px] h-[500px] bg-[#D8D8D8] border bottom-2 border-black flex justify-center items-center'>
                                <img src={"https://images.unsplash.com/photo-1684148491611-a22a0b8b23bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"} alt="" className='max-w-[60%] max-h-[60%]'

                                    onClick={() => openLightbox("https://images.unsplash.com/photo-1684148491611-a22a0b8b23bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80")} />
                            </div>
                        </div>
                        {lightboxVisible && (
                            <div
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 9999,
                                }}
                                onClick={closeLightbox}
                            >
                                <img src={selectedImage} alt="" style={{ maxHeight: '90%', maxWidth: '90%' }} />
                            </div>
                        )}

                    </div>
                </div>
                <div className='w-full px-20'>
                    <div className='flex flex-row justify-between font-avenir text-2xl'>
                        <div className='text-black font-extralight'>
                            <h2 className='select-none'>
                                AIJI © 2023. Site web
                            </h2>
                        </div>
                        <div className='text-black font-extralight flex flex-row gap-2'>
                            <a href="">IG.</a>
                            <a href="">LIN.</a>
                            <a href="">TEL.</a>
                            <a href="">MAIL.</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo

"use client";
import { useEffect, useState } from "react";
import Image from "next/image"; // Next.js Image component
import Pagination from "./Pagination";
import styles from "./CharacterList.module.css";
interface Character { 
  id: number;
  name: string;
  image: string;
}

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]); // an empty array of characters  
  const [page, setPage] = useState(1); 
  const [totalCharacters, setTotalCharacters] = useState<number>(0); // the total number of characters in the API
  
  // the API has 20 characters per page, but we only have 10.
  const fetchData = async () => { 
    try { 
      const APIPage = Math.ceil(page / 2)
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${APIPage}`); 
      const data = await response.json(); 
      setTotalCharacters(data.info.count);
      const contentToDispaly = (page % 2 === 0) ? data.results.slice(10, 20) : data.results.slice(0, 10) // 10 characters per page
      setCharacters(contentToDispaly);
    } catch (error) { 
      console.error("An error occurred while fetching data: ", error); 
    }
  }

  useEffect(() => {
    fetchData();
  }, [page] )

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Rick And Morty Characters</h1> 
      <div className={styles.grid}> 
        {characters.map((character) => ( 
          <div key={character.id}> 
            <div className={styles.card}>
              <Image className={styles.image} src={character.image} layout="fill" alt={character.name} /> 
            </div>
            <h3 className={styles.characterName}>{character.name}</h3> 
          </div> 
        ))} 
      </div> 
      <div> 
          <Pagination currentPage={page} totalPages={Math.ceil(totalCharacters / 10)} onPageChange={setPage} /> 
      </div>
    </div>
  )
}

export default CharacterList; 
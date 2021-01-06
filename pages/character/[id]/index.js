import Head from 'next/head';

import styles from '../../../styles/Home.module.css';
const defaultEndpoint = 'https://rickandmortyapi.com/api/character/';
import Link from 'next/link';

export async function getServerSideProps({ query }) {
  const { id } = query;

  const res = await fetch(`${defaultEndpoint}/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default function Character({ data }) {
  const { name, image, gender, location, origin, species, status } = data;
  return (
    <div className={styles.container}>
      <Head>
        <title>{name}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>{name}</h1>
        <div className='profile'>
          <div className='profile-image'>
            <img src={image} alt={name} />
          </div>

          <div className='profile-details'>
            <h2>Detalhes do personagem</h2>
            <ul>
              <li>
                <strong>Nome:</strong> {name}
              </li>
              <li>
                <strong>Status:</strong> {status}
              </li>
              <li>
                <strong>Genero:</strong> {gender}
              </li>
              <li>
                <strong>Spécie:</strong> {species}
              </li>
              <li>
                <strong>Localidade:</strong> {location?.name}
              </li>
              <li>
                <strong>Originalmente de:</strong> {origin?.name}
              </li>
            </ul>
          </div>
        </div>

        <p className='back'>
          <Link href='/'>
            <a>Voltar para todos os personagens</a>
          </Link>
        </p>

        <style jsx>{`
        .profile {
          display: flex;
          margin-top: 2em;
        }
        
        @media (max-width: 600px) {
          .profile {
            flex-direction: column;
          }
        }
        
        .profile-image {
          margin-right: 2em;
        }
        
        @media (max-width: 600px) {
          .profile-image {
            max-width: 100%;
            margin: 0 auto;
          }
        `}</style>
      </main>
    </div>
  );
}

import './styles/main.css';
import Logo from './assets/Logo.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';
import { Game } from './types/game.model';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios'
import { CreateAddModal } from './components/CreateAddModal';

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games') 
    .then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center my-10">
      <img src={Logo} alt="" />
      <h1 className="text-6xl text-white font-black mt-10">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-12">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
        ))}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        
        <CreateAddModal /> 
      </Dialog.Root>
    </div>
  );
}

export default App;

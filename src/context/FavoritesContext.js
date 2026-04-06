import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([
    { id: '5', name: 'Sprite Can', weight: '325ml', price: 1.50, image: require('../../assets/sprite.png') },
    { id: '6', name: 'Diet Coke', weight: '355ml', price: 1.99, image: require('../../assets/dietcoke.png') },
    { id: '7', name: 'Apple & Grape Juice', weight: '2L', price: 15.50, image: require('../../assets/applegrape.png') },
    { id: '8', name: 'Coca Cola Can', weight: '325ml', price: 4.99, image: require('../../assets/coca.png') },
    { id: '9', name: 'Pepsi Can', weight: '330ml', price: 4.99, image: require('../../assets/pepsi.png') },
  ]);

  const toggleFavorite = (product) => {
    setFavorites(prev => {
      if (prev.find(i => i.id === product.id)) return prev.filter(i => i.id !== product.id);
      return [...prev, product];
    });
  };

  const isFavorite = (id) => favorites.some(i => i.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);

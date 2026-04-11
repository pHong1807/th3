import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (product) => {
    setFavorites(prev => {
      if (prev.find(i => i.id === product.id)) return prev.filter(i => i.id !== product.id);
      return [...prev, product];
    });
  };

  const isFavorite = (id) => favorites.some(i => i.id === id);

  const clearFavorites = () => setFavorites([]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
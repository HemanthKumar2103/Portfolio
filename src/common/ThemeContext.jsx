import React, {createContext, useContext, useEffect, useState} from 'react';

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider =({children}) => {
    const [theme,setTheme] = useState(
        () => localStorage.getItem('theme') || 'light' 
    )
    
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        console.log('Theme applied:', theme);
    }, [theme]);

    const toggleTheme = () => {
        console.log("Theme switching from", theme, "to", theme === 'light' ? 'dark' : 'light');
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    }
    
    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};

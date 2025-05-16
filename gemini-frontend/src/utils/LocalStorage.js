export const saveToLocalStorage = (key, value) => {
    try{
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error saving in local storage:", error)
    }
};

export const loadfromLocalStorage = (key, defaultValue = []) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error("Error loading from local storage", error);
        return defaultValue;
    }
};
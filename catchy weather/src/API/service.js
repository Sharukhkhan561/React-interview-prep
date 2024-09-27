import { apiKey } from "../constant/constant";
export const getWeatherData = async (city) => {
   const response = await fetch(
     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
   );
   const data = await response.json();
   return data;
 };
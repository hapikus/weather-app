import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );
  
  const dayMinMax = new Map();
  data.list.forEach(elem => {
    let dayDate = elem.dt_txt.split(' ')[0];    
    if (dayMinMax.has(dayDate)) {
      let dayMin = +elem.main.temp_min;
      let dayMax = +elem.main.temp_max;
      dayMinMax.set(dayDate, [...dayMinMax.get(dayDate), dayMin, dayMax]);
    } else {
      dayMinMax.set(dayDate, [+elem.main.temp_min, +elem.main.temp_max])
    }
  })

  const dataFiltred = data.list.filter((elem, index) => elem.dt_txt.split(' ')[1] === "12:00:00");

  return (
    <>
      <label className="title"></label>
      <Accordion allowZeroExpanded>
        {dataFiltred.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    alt="weather"
                    className="icon-small"
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <label className="day">{forecastDays[index]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.min(...dayMinMax.get(item.dt_txt.split(' ')[0])).toFixed(0)}°C-
                    {Math.max(...dayMinMax.get(item.dt_txt.split(' ')[0])).toFixed(0)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure</label>
                  <label>{item.main.pressure.toFixed(0)} hPa</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity</label>
                  <label>{item.main.humidity.toFixed(0)}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds</label>
                  <label>{item.clouds.all.toFixed(0)}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind</label>
                  <label>{item.wind.speed.toFixed(2)} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea level</label>
                  <label>{item.main.sea_level} m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like</label>
                  <label>{item.main.feels_like.toFixed(0)}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;

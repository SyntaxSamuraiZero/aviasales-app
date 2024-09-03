import React from "react";
import styles from "./Ticket.module.scss";
import { addMinutes, format } from "date-fns";
import getPluralForm from "../../utils/getPluralForm";

export default function TicketsList({ ticket }) {
  return (
    <li className={styles["tickets-list__item"]}>
      <div className={styles["tickets-list__price-container"]}>
        <span className={styles["tickets-list__price"]}>
          {ticket.price.toLocaleString("ru-RU")} Р
        </span>
        <img
          className={styles["tickets-list__logo-carrier"]}
          src={`https://pics.avs.io/99/36/${ticket.carrier}.png`}
          alt="logo-carrier"
        />
      </div>

      <div className={styles["tickets-list__details-container"]}>
        {ticket.segments.map((segment, index) => (
          <React.Fragment key={index}>
            <div className={styles["tickets-list__details"]}>
              <span className={styles["tickets-list__label"]}>
                {segment.origin} – {segment.destination}
              </span>
              <span className={styles["tickets-list__value"]}>
                {format(new Date(segment.date), "HH:mm")} -{" "}
                {format(
                  addMinutes(new Date(segment.date), segment.duration),
                  "HH:mm"
                )}
              </span>
            </div>
            <div className={styles["tickets-list__details"]}>
              <span className={styles["tickets-list__label"]}>В пути</span>
              <span className={styles["tickets-list__value"]}>
                {format(addMinutes(new Date(0, 0), segment.duration), "Hч mм")}
              </span>
            </div>
            <div className={styles["tickets-list__details"]}>
              <span className={styles["tickets-list__label"]}>
                {segment.stops.length}{" "}
                {getPluralForm(segment.stops.length, [
                  "пересадка",
                  "пересадки",
                  "пересадок",
                ])}
              </span>
              <span className={styles["tickets-list__value"]}>
                {segment.stops.join(", ")}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </li>
  );
}

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";

function setTime(h1, m1, h2, m2, set_h, set_m) {
    let h = h1 + h2
    let m = m1 + m2
    if (m > 59) {
        h  = h + 1
        m  = m - 60
    }
    if (m < 0) {
        h  = h - 1
        m  = m + 60
    }
    set_h(h)
    set_m(m)
}

function minStr(m){
  if (m < 10){
    return "0"+m
  }
  return m
}

export default function App() {
  const { register, handleSubmit } = useForm();

  const [t1h, set_t1h] = useState(0);
  const [t1m, set_t1m] = useState(0);
  const [t2h, set_t2h] = useState(0);
  const [t2m, set_t2m] = useState(0);
  const [t3h, set_t3h] = useState(0);
  const [t3m, set_t3m] = useState(0);
  const [t4h, set_t4h] = useState(0);
  const [t4m, set_t4m] = useState(0);

  const [tth, set_tth] = useState(0);
  const [ttm, set_ttm] = useState(0);

    const [takeoff_h, set_takeoff_h] = useState(0);
    const [takeoff_m, set_takeoff_m] = useState(0);

  const [time_h, set_time_h] = useState(0);
  const [time_m, set_time_m] = useState(0);

  const [total_time_h, set_total_time_h] = useState(0);
  const [total_time_m, set_total_time_m] = useState(0);

  const [block_time_h, set_block_time_h] = useState(0);
  const [block_time_m, set_block_time_m] = useState(0);

  const [flights, set_flights] = useState(0);

  const [total_flights, set_total_flights] = useState(0);
  const [tf, set_tf] = useState(0);


  const onSubmit = (data) => {
    takeoff_h = parseInt(data.takeoff_h, 10)
    takeoff_m = parseInt(data.takeoff_m, 10)

    time_h = parseInt(data.time_h, 10)
    time_m = parseInt(data.time_m, 10)

    total_time_h = parseInt(data.total_time_h, 10)
    total_time_m = parseInt(data.total_time_m, 10)

    flights = parseInt(data.flights, 10)
    total_flights = parseInt(data.total_flights, 10)

    set_takeoff_h(takeoff_h)
    set_takeoff_m(takeoff_h)
    set_time_h(time_h)
    set_time_m(time_m)
    // set_total_time_h(total_time_h)
    // set_total_time_m(total_time_m)
    set_flights(flights)
    set_total_flights(total_flights)

    setTime(takeoff_h, takeoff_m, 0, -5, set_t1h, set_t1m)
    setTime(takeoff_h, takeoff_m, 0, 0, set_t2h, set_t2m)

    setTime(takeoff_h, takeoff_m, time_h, time_m, set_t3h, set_t3m)
    setTime(takeoff_h, takeoff_m, time_h, time_m + 5, set_t4h, set_t4m)

    setTime(total_time_h, total_time_m, time_h, time_m, set_tth, set_ttm)

    setTime(time_h, time_m, 0, 10, set_block_time_h, set_block_time_m)
  }

  return (
    <>
    <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Takeoff time (hh:mm)</p>
      <input {...register("takeoff_h")} type="text" size="2" maxLength="2" inputMode="numeric" />
      <input {...register("takeoff_m")} type="text"  size="2" maxLength="2" inputMode="numeric" />
      <p>Flight time (hh:mm)</p>
      <input {...register("time_h")} type="text" size="2" maxLength="2" inputMode="numeric"/>
      <input {...register("time_m")} type="text" size="2" maxLength="2" inputMode="numeric" />
      <p>Number of flights</p>
      <input {...register("flights")} type="text" size="5" maxLength="5" inputMode="numeric"/>
      <p>Total time (hh:mm)</p>
      <input {...register("total_time_h")} type="text" size="5" maxLength="5" inputMode="numeric"/>
      <input {...register("total_time_m")} type="text" size="2" maxLength="2" inputMode="numeric" />
      <p>Total number of flights</p>
      <input {...register("total_flights")} type="text" size="5" maxLength="5" inputMode="numeric"/>
      <p>
      <input type="submit" />
      </p>
      <p>Time: {t1h}:{minStr(t1m)}/{t2h}:{minStr(t2m)} - {t3h}:{minStr(t3m)}/{t4h}:{minStr(t4m)}</p>
      <p>Flight time: {time_h}:{minStr(time_m)}</p>
      <p>Block time: {block_time_h}:{minStr(block_time_m)}</p>
      <p>Total flight time: {tth}:{minStr(ttm)}</p>
      <p>Total flights: {flights + total_flights}</p>
      <hr/>
      AKLT Time Utils, 2021 Ondrej Sika
    </form></>
  );
}

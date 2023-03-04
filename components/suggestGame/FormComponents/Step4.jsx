import React from "react";


// STYLES
import styles from "../styles.module.scss";

function Step4({ data, updateFieldHandler, movie }) {
  const dataMovies = Object.values(movie);

  function filter_data_movies(movies) {
    return movies.filter((item) => {

      for (var i = 0; item.genre_ids.length > i; i++) {
        if (
          data.step1 == item.genre_ids[i] ||
          data.step2 == item.genre_ids[i] ||
          data.step3 == item.genre_ids[i]
        ) {
          return item;
        } else {
          return console.log("result if of the if of the for  : ", item);
        }
      }
    });
  }

  return (
    <div className={styles.step_4}>
      <header>
        <h4>04.</h4>
        <h2>Qual sugestão deseja assistir?</h2>
      </header>

      <div className={styles.box_images}>
        {filter_data_movies(dataMovies)
          .map((data, key) => {
            return (
              <div key={key} className={styles.card}>
                <label htmlFor="movie1">
                  <input
                    type="radio"
                    name="box"
                    id="movie1"
                    required
                    value={data.id}
                    checked={data.step4 === data.id}
                    onChange={(event) =>
                      updateFieldHandler("step4", event.target.value)
                    }
                  />
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`}
                    alt={data.backdrop_path}
                  />
                  <figcaption>{data.original_title}</figcaption>
                </label>
              </div>
            );
          })
          .splice(-3)}
      </div>
    </div>
  );
}

export default Step4;

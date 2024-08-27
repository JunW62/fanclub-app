import React from "react";
import "../styles/AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Cael Anselm</h1>

      <section className="about-section">
        <p>
          Cael Anselm is a captivating character from the Lovebrush Chronicles
          universe. As one of the main characters in the Modern World setting,
          Cael plays a significant role in the story and the life of the main
          character (MC).
        </p>
      </section>

      <section className="about-section">
        <h2 className="section-title">Background</h2>
        <p>
          Cael serves as the MC's guardian, taking on this responsibility after
          the passing of MC's mother. He is known for his frequent business
          trips, which often take him away from home. In the professional world,
          Cael holds the position of Professor in the Art Department at St.
          Shelter Academia.
        </p>
      </section>

      <section className="about-section">
        <h2 className="section-title">Appearance</h2>
        <p>
          Cael is distinguished by his striking appearance. He stands tall at
          183cm (6ft) and is easily recognizable by his long white hair and
          light purple eyes. This unique combination gives him an ethereal and
          mysterious aura.
        </p>
      </section>

      <section className="about-section">
        <h2 className="section-title">Personality</h2>
        <p>
          While the full extent of Cael's personality is yet to be explored, he
          is described as "a person with a hidden side." This suggests a complex
          character with depths yet to be revealed to the player or reader.
        </p>
      </section>

      <section className="about-section">
        <h2 className="section-title">Role in the Story</h2>
        <p>
          Cael makes his debut in the Prologue of the story and continues to
          play a significant part throughout the Modern World narrative. His
          role as both guardian and professor places him in a unique position to
          influence and guide the MC's journey.
        </p>
      </section>

      <section className="about-section">
        <h2 className="section-title">Interesting Facts</h2>
        <ul className="about-list">
          <li className="about-list-item">
            <strong>Birthday:</strong> December 31st
          </li>
          <li className="about-list-item">
            <strong>Zodiac Sign:</strong> Capricorn
          </li>
          <li className="about-list-item">
            <strong>Associated Flowers:</strong> Lavender and Wisteria
          </li>
          <li className="about-list-item">
            <strong>Associated Color:</strong> Pale Purple
          </li>
          <li className="about-list-item">
            <strong>Alias:</strong> Emerald (though the context of this alias is
            not provided)
          </li>
        </ul>
      </section>

      <section className="about-section">
        <p>
          Cael Anselm is voiced by Daisuke Hirakawa in the Japanese version of
          the game and by Zhenyang Ma in the Chinese version.
        </p>
      </section>

      <p className="about-footnote">
        Source:{" "}
        <a
          href="https://lovebrush-chronicles.fandom.com/wiki/Cael_Anselm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cael Anselm - Lovebrush Chronicles Wiki
        </a>
      </p>
    </div>
  );
};

export default AboutPage;

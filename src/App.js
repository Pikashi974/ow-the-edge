import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./App.css";

function App() {
  const [cardNormal, setNormal] = useState({
    id: null,
    name: "",
    typeline: [],
    type: "",
    humanReadableCardType: "",
    frameType: "",
    desc: "",
    race: "",
    atk: null,
    def: null,
    level: null,
    attribute: "",
    ygoprodeck_url: "",
    card_sets: [],
    card_images: [],
    card_prices: [],
  });
  const [cardEffect, setEffect] = useState({
    id: null,
    name: "",
    typeline: [],
    type: "",
    humanReadableCardType: "",
    frameType: "",
    desc: "",
    race: "",
    atk: null,
    def: null,
    level: null,
    attribute: "",
    ygoprodeck_url: "",
    card_sets: [],
    card_images: [],
    card_prices: [],
  });
  const [level, setLevel] = useState(null);
  const [type, setType] = useState("");
  const [attribute, setAttribute] = useState("");
  const [listeResultNormal, setResultNormal] = useState([]);
  const [listeResultEffect, setResultEffect] = useState([]);
  const [listeResultStats, setResultStats] = useState([]);
  const [error, setError] = useState(null);

  const [data, setData] = useState(require("./data.json"));

  async function getData() {
    return await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async function handleSubmitNormal(e) {
    e.preventDefault();
    try {
      document.querySelector("#nameNormalInput").classList.remove("is-invalid");
      if (cardNormal.name === "") {
        document.querySelector("#nameNormalInput").classList.add("is-invalid");
      }
      // if (id === "") {
      // }
      if (cardNormal.name !== "" && cardNormal.id !== "") {
        // FindText(id, nameNormal, data);
      }
    } catch (err) {
      setError(err);
      console.error(error);
      document.querySelector("#nameNormalInput").classList.add("is-invalid");
    }
  }
  async function handleSubmitEffect(e) {
    e.preventDefault();
    try {
      document.querySelector("#nameInput").classList.remove("is-invalid");
      if (cardNormal.name === "") {
        document.querySelector("#nameInput").classList.add("is-invalid");
      }
      // if (id === "") {
      // }
      if (cardNormal.length > 0) {
        // FindText(id, nameNormal, data);
      }
    } catch (err) {
      setError(err);
      console.error(error);
      document.querySelector("#nameInput").classList.add("is-invalid");
    }
  }
  async function handleSubmitStats(e) {
    e.preventDefault();
    try {
      if (level !== null || type !== "" || attribute !== "") {
        let liste = data.filter(
          (element) =>
            element.level &&
            element.level <= 3 &&
            (element.frameType.includes("normal") ||
              element.frameType.includes("effect"))
        );
        if (level !== "") {
          liste = liste.filter((res) => res.level === level);
        }
        if (type !== "") {
          liste = liste.filter((res) => res.race === type);
        }
        if (attribute !== "") {
          liste = liste.filter((res) => res.attribute === attribute);
        }
        setResultStats(liste);
      } else {
        alert("No parameters selected");
      }
    } catch (err) {
      setError(err);
      console.error(error);
      document.querySelector("#nameInput").classList.add("is-invalid");
    }
  }

  function handleNameChange(e) {
    let liste_name = data
      .filter(
        (element) =>
          element.level &&
          element.level <= 3 &&
          element.frameType.includes("normal")
      )
      .map((card) => card.name);
    if (liste_name.includes(e.target.value)) {
      let card = data.find((card) => card.name === e.target.value);
      setNormal({
        id: card.id,
        name: card.name,
        typeline: card.typeline,
        type: card.type,
        humanReadableCardType: card.humanReadableCardType,
        frameType: card.frameType,
        desc: card.desc,
        race: card.race,
        atk: card.atk,
        def: card.def,
        level: card.level,
        attribute: card.attribute,
        ygoprodeck_url: card.url,
        card_sets: card.card_sets,
        card_images: card.card_images,
        card_prices: card.card_prices,
      });
      setResultNormal(
        data.filter(
          (res) =>
            res.frameType.includes("effect") &&
            res.race === card.race &&
            res.attribute === card.attribute &&
            res.level === card.level
        )
      );
    }
  }
  function handleNameChangeEffect(e) {
    let liste_name = data
      .filter(
        (element) =>
          element.level &&
          element.level <= 3 &&
          element.frameType.includes("effect")
      )
      .map((card) => card.name);
    if (liste_name.includes(e.target.value)) {
      let card = data.find((card) => card.name === e.target.value);
      setEffect({
        id: card.id,
        name: card.name,
        typeline: card.typeline,
        type: card.type,
        humanReadableCardType: card.humanReadableCardType,
        frameType: card.frameType,
        desc: card.desc,
        race: card.race,
        atk: card.atk,
        def: card.def,
        level: card.level,
        attribute: card.attribute,
        ygoprodeck_url: card.url,
        card_sets: card.card_sets,
        card_images: card.card_images,
        card_prices: card.card_prices,
      });
      setResultEffect(
        data.filter(
          (res) =>
            res.frameType.includes("normal") &&
            res.race === card.race &&
            res.attribute === card.attribute &&
            res.level === card.level
        )
      );
    }
  }
  function handleLevelChange(e) {
    setLevel(Number(e.target.value));
    console.log(e.target.value);
  }
  function handleTypeChange(e) {
    setType(e.target.value);
    console.log(e.target.value);
  }
  function handleAttributeChange(e) {
    setAttribute(e.target.value);
    console.log(e.target.value);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <Tabs
        defaultActiveKey="normal"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab
          className="tab-pane"
          eventKey="normal"
          title="Find by Normal Monster"
        >
          <div className="tab-pane">
            <form id="formNormal" className="m-3" onSubmit={handleSubmitNormal}>
              <div className="row justify-content-center">
                <label
                  className="col-sm-1 col-form-label align-content-center"
                  htmlFor="listNormal"
                >
                  Name:
                </label>
                <div className="col-sm-5 align-content-center">
                  <input
                    list="listNormal"
                    className="form-control"
                    onChange={handleNameChange}
                    onSelect={handleNameChange}
                    id="nameNormalInput"
                  ></input>
                  <div className="valid-feedback">{cardNormal.name}</div>
                  <div className="invalid-feedback">
                    Choose a Normal Monster
                  </div>
                </div>
                <div
                  className="col-sm-5 border border-black"
                  id="previewNormal"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <div
                    className="d-inline-flex"
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                      gap: "1rem",
                    }}
                  >
                    {cardNormal.id === null ? (
                      ""
                    ) : (
                      <img
                        src={
                          "https://pikashi974.github.io/Tierlist/src/img/" +
                          cardNormal.id +
                          ".jpg"
                        }
                        width="200rem"
                        height="200rem"
                        alt={cardNormal.name}
                        title={cardNormal.name}
                      />
                    )}
                    {cardNormal.id === null ? (
                      ""
                    ) : (
                      <div className="">
                        <h3>{cardNormal.name}</h3>
                        <h4>
                          Level {cardNormal.level} {cardNormal.attribute}{" "}
                          {cardNormal.race}
                        </h4>
                        <p>
                          ATK: {cardNormal.atk} DEF: {cardNormal.def}
                        </p>
                        <p>{cardNormal.desc}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <br />
              {/* <button type="submit" className="btn btn-success">
                Find
              </button> */}
            </form>
            <datalist id="listNormal">
              {data
                .filter(
                  (element) =>
                    element.level &&
                    element.level <= 3 &&
                    element.frameType.includes("normal")
                )
                .map((card) => (
                  <option key={card.id} data-id={card.id} value={card.name} />
                ))}
            </datalist>
          </div>
          <div
            id="outputNormal"
            style={{
              display: "grid",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            {listeResultNormal.map((card) => (
              <div
                className="d-inline-flex border border-black"
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  gap: "1rem",
                }}
              >
                <img
                  src={
                    "https://pikashi974.github.io/Tierlist/src/img/" +
                    card.id +
                    ".jpg"
                  }
                  height="500rem"
                  width="500rem"
                  alt={card.id}
                  title={card.name}
                />
                <div
                  className=""
                  style={{
                    maxWidth: "20rem",
                  }}
                >
                  <h3>{card.name}</h3>
                  <h4>
                    Level {card.level} {card.attribute} {card.race}
                  </h4>
                  <p>
                    ATK: {card.atk} DEF: {card.def}
                  </p>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Tab>
        <Tab
          className="tab-pane"
          eventKey="effect"
          title="Find by Effect Monster"
        >
          <div className="tab-pane">
            <form id="formEffect" className="m-3" onSubmit={handleSubmitEffect}>
              <div className="row justify-content-center">
                <label className="col-sm-1 col-form-label" htmlFor="listEffect">
                  Name:
                </label>
                <div className="col-sm-5">
                  <input
                    list="listEffect"
                    className="form-control"
                    onChange={handleNameChangeEffect}
                    onSelect={handleNameChangeEffect}
                    id="nameEffectInput"
                  ></input>
                  <div className="invalid-feedback">
                    Choose an Effect Monster
                  </div>
                </div>

                <div
                  className="col-sm-5 border border-black"
                  id="previewEffect"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <div
                    className="d-inline-flex"
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                      gap: "1rem",
                    }}
                  >
                    {cardEffect.id === null ? (
                      ""
                    ) : (
                      <img
                        src={
                          "https://pikashi974.github.io/Tierlist/src/img/" +
                          cardEffect.id +
                          ".jpg"
                        }
                        width="200rem"
                        height="200rem"
                        alt={cardEffect.name}
                        title={cardEffect.name}
                      />
                    )}
                    {cardEffect.id === null ? (
                      ""
                    ) : (
                      <div className="">
                        <h3>{cardEffect.name}</h3>
                        <h4>
                          Level {cardEffect.level} {cardEffect.attribute}{" "}
                          {cardEffect.race}
                        </h4>
                        <p>
                          ATK: {cardEffect.atk} DEF: {cardEffect.def}
                        </p>
                        <p>{cardEffect.desc}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <br />
              {/* <button type="submit" className="btn btn-success">
                Find
              </button> */}
            </form>
            <datalist id="listEffect">
              {data
                .filter(
                  (element) =>
                    element.level &&
                    element.level <= 3 &&
                    element.frameType.includes("effect")
                )
                .map((card) => (
                  <option key={card.id} data-id={card.id} value={card.name} />
                ))}
            </datalist>
          </div>
          <div
            id="outputEffect"
            style={{
              display: "grid",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            {listeResultEffect.map((card) => (
              <div
                className="d-inline-flex border border-black"
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  gap: "1rem",
                }}
              >
                <img
                  src={
                    "https://pikashi974.github.io/Tierlist/src/img/" +
                    card.id +
                    ".jpg"
                  }
                  height="500rem"
                  width="500rem"
                  alt={card.id}
                  title={card.name}
                />
                <div
                  className=""
                  style={{
                    maxWidth: "20rem",
                  }}
                >
                  <h3>{card.name}</h3>
                  <h4>
                    Level {card.level} {card.attribute} {card.race}
                  </h4>
                  <p>
                    ATK: {card.atk} DEF: {card.def}
                  </p>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Tab>
        <Tab className="tab-pane" eventKey="stats" title="Find by stats">
          <div className="tab-pane">
            <form id="formStats" className="m-3" onSubmit={handleSubmitStats}>
              <div className="row justify-content-center">
                <label
                  className="col-sm-1 col-form-label"
                  htmlFor="numberStatsInput"
                >
                  Level:
                </label>
                <div className="col-sm-2">
                  <input
                    type="number"
                    className="form-control"
                    onChange={handleLevelChange}
                    onSelect={handleLevelChange}
                    id="numberStatsInput"
                    min={1}
                    max={3}
                  ></input>
                  <div className="invalid-feedback">Choose a level</div>
                </div>
                <label
                  className="col-sm-1 col-form-label"
                  htmlFor="typeStatsInput"
                >
                  Type:
                </label>
                <div className="col-sm-2">
                  <select
                    className="form-control"
                    onChange={handleTypeChange}
                    onSelect={handleTypeChange}
                    id="typeStatsInput"
                  >
                    <option value="">--Please choose an option--</option>
                    {[
                      ...new Set(
                        data
                          .filter(
                            (element) =>
                              element.level &&
                              element.level <= 3 &&
                              (element.frameType.includes("normal") ||
                                element.frameType.includes("effect"))
                          )
                          .map((card) => card.race)
                      ),
                    ].map((types) => (
                      <option value={types}>{types}</option>
                    ))}
                  </select>
                  <div className="invalid-feedback">Choose a type</div>
                </div>
                <label
                  className="col-sm-1 col-form-label"
                  htmlFor="typeStatsInput"
                >
                  Attribute:
                </label>
                <div className="col-sm-2">
                  <select
                    className="form-control"
                    onChange={handleAttributeChange}
                    onSelect={handleAttributeChange}
                    id="attributeStatsInput"
                  >
                    <option value="">--Please choose an option--</option>
                    {[
                      ...new Set(
                        data
                          .filter(
                            (element) =>
                              element.level &&
                              element.level <= 3 &&
                              (element.frameType.includes("normal") ||
                                element.frameType.includes("effect"))
                          )
                          .map((card) => card.attribute)
                      ),
                    ].map((attributes) => (
                      <option value={attributes}>{attributes}</option>
                    ))}
                  </select>
                  <div className="invalid-feedback">Choose an attribute</div>
                </div>
              </div>
              <br />
              <button type="submit" className="btn btn-success">
                Find
              </button>
            </form>
          </div>
          <div
            className="d-grid"
            style={{
              gridTemplateColumns: "50% 50%",
            }}
          >
            <div
              id="outputStatsNormal"
              style={{
                gap: 0,
              }}
            >
              <h3 class="card-header">Normal Monster</h3>
              {listeResultStats
                .filter((card) => card.frameType.includes("normal"))
                .map((card) => (
                  <div
                    className="d-inline-flex border border-black"
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                      gap: "1rem",
                    }}
                  >
                    <img
                      src={
                        "https://pikashi974.github.io/Tierlist/src/img/" +
                        card.id +
                        ".jpg"
                      }
                      height="500rem"
                      width="500rem"
                      alt={card.id}
                      title={card.name}
                    />
                    <div
                      className=""
                      style={{
                        maxWidth: "20rem",
                      }}
                    >
                      <h3>{card.name}</h3>
                      <h4>
                        Level {card.level} {card.attribute} {card.race}
                      </h4>
                      <p>
                        ATK: {card.atk} DEF: {card.def}
                      </p>
                      <p>{card.desc}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div
              id="outputStatsEffect"
              style={{
                gap: 0,
              }}
            >
              <h3 class="card-header">Effect Monster</h3>
              {listeResultStats
                .filter((card) => card.frameType.includes("effect"))
                .map((card) => (
                  <div
                    className="d-inline-flex border border-black"
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                      gap: "1rem",
                    }}
                  >
                    <img
                      src={
                        "https://pikashi974.github.io/Tierlist/src/img/" +
                        card.id +
                        ".jpg"
                      }
                      height="500rem"
                      width="500rem"
                      alt={card.id}
                      title={card.name}
                    />
                    <div
                      className=""
                      style={{
                        maxWidth: "20rem",
                      }}
                    >
                      <h3>{card.name}</h3>
                      <h4>
                        Level {card.level} {card.attribute} {card.race}
                      </h4>
                      <p>
                        ATK: {card.atk} DEF: {card.def}
                      </p>
                      <p>{card.desc}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;

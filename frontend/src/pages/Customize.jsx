import React, { useState, useEffect } from "react";
import { DndProvider, useDrop } from 'react-dnd';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CustomizeWrapper } from "../wrappers/Customize";
import SideBar from "../components/SideBar";
import Button from "../components/Button";
import dragDropIcon from '../assets/drop.png'


import dropShoulder_black_front from '../assets/tshirt_types_colors/dropShoulder_black_front.png';
import dropShoulder_black_back from '../assets/tshirt_types_colors/dropShoulder_black_back.png';
import dropShoulder_white_back from '../assets/tshirt_types_colors/dropShoulder_white_back.png';
import dropShoulder_white_front from '../assets/tshirt_types_colors/dropShoulder_white_front.png';
import regularFit_black_back from '../assets/tshirt_types_colors/regularFit_black_back.png';
import regularFit_black_front from '../assets/tshirt_types_colors/regularFit_black_front.png';
import regularFit_white_front from '../assets/tshirt_types_colors/regularFit_white_front.png'
import regularFit_white_back from '../assets/tshirt_types_colors/regularFit_white_back.png'

import { useDrag } from "react-dnd";

import { DesignsData } from "../Data/DesignsImages";


const Customize = () => {
  const [tshirtView, setTshirtView] = useState("back");
  const [selectedSize, setSelectedSize] = useState('l')
  const [selectedColor, setSelectedColor] = useState('black')

  const [Tshirtboard, setTshirtBoard] = useState([null])
  const [DesignBoardFront, setDesignBoardFront] = useState([null])
  const [DesignBoardBack, setDesignBoardBack] = useState([null])
  const [designPriceTracker, setDesignPriceTracker] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)

  const [designDataList, setDesignDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [designPrice, setDesignPrice] = useState(null)


  let currentFrontDesignPrice = 0;
  let currentBackDesignPrice = 0;
  let tshirtOnlyPrice = null;

  const designDataFunc = (data) => {
    setDesignDataList(data)
  }
  const TshirtData = [
    {
      id: 1,
      name: "Drop Shoulder T-Shirt",
      type: 'dropshoulder',
      image: {
        front: dropShoulder_black_front,
        back: dropShoulder_black_back,
      },
      colors: {
        white: {
          front: dropShoulder_white_front,
          back: dropShoulder_white_back,
        }
      }
    },
  ]

  const prices = { dropshoulder: 400, regularfit: 250, design: designPrice };
  const addPriceForItem = (itemType) => {
    if (itemType === 'design') {
      setDesignPriceTracker(true)
    }
    tshirtOnlyPrice = prices[itemType]
    console.log(tshirtOnlyPrice)
    setTotalPrice((prev) => prev + prices[itemType]);
  };


  const Price = () => {

  }




  const TshirtFrontPriceCalc = (price) => {
    tshirtOnlyPrice =- currentFrontDesignPrice
    tshirtOnlyPrice =+ price
    console.log(tshirtOnlyPrice)
    currentFrontDesignPrice = price
    console.log(currentFrontDesignPrice)
  }
  const TshirtBackPriceCalc = (price) => {
    tshirtOnlyPrice =- currentBackDesignPrice
    tshirtOnlyPrice =+ price
    console.log(tshirtOnlyPrice)
    currentBackDesignPrice = price
    console.log(currentBackDesignPrice)
  }
 
  const TshirtOnBoard = ({ tshirt }) => {

    const [{ isOver }, drop] = useDrop(() => ({
      accept: 'DESIGN',
      drop: (item) => addDesignToTshirt(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }))

    var addDesignToTshirt = (id) => {


      const designList = designDataList.filter((item) => item._id === id)

      if (tshirtView === 'front') {
        setDesignBoardFront(designList[0])
        // console.log(designList[0].price)
        // setDesignPrice(designDataList[0].price)
        TshirtFrontPriceCalc(designDataList[0].price)
        console.log(designPriceTracker)
        if (!designPriceTracker) {
          console.log('adding design price' + designDataList[0].price)
          // addPriceForItem('design')
        }
      } else {
        setDesignBoardBack(designList[0])
        // setDesignPrice(designDataList[0].price)
        // prices.design = designDataList[0].price
        // console.log(designPriceTracker)
        TshirtBackPriceCalc(designDataList[0].price)
        if (!designPriceTracker) {
          console.log('adding design price' + designDataList[0].price)
          // addPriceForItem('design')
        }
      }
    }


    if (!tshirt || !tshirt.image || !tshirt.colors) {
      return <div className="drag-drop-message">
        <img src={dragDropIcon} alt="" />
        <p>Drag and drop a tshirt to start</p>
      </div>;
    }

    return (
      <div ref={drop} className="tshirt">

        {
          tshirtView === 'front' ?
            <div className="front-side-tshirt-view-container">
              <img className="type-of-tshirt" src={selectedColor === 'black' ? tshirt.image[tshirtView] : `${tshirt.colors[selectedColor][tshirtView]}`} alt={' '} />
              {
                DesignBoardFront ? <img className="design-of-the-tshirt-front" src={DesignBoardFront.image} alt={' '} /> : ''
              }
            </div> :
            <div className="back-side-tshirt-view-container">
              <img className="type-of-tshirt" src={selectedColor === 'black' ? tshirt.image[tshirtView] : `${tshirt.colors[selectedColor][tshirtView]}`} alt={' '} />
              {
                DesignBoardBack ? <img className="design-of-the-tshirt-back" src={DesignBoardBack.image} alt={' '} /> : ''
              }
            </div>
        }

      </div>
    )
  }



  const TshirtViewHandler = (view) => {
    setTshirtView(view);
  };



  const colorsData = ['black', 'white', 'beige', 'blue']
  const sizeData = ['s', 'm', 'l', 'xl']

  const TshirtType = ({ tshirt }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'TSHIRT',
      item: { id: tshirt.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }))

    return (<div key={tshirt.id} onClick={() => addItemsToBoard(tshirt.id)} className="tshirt-view">
      <h1>{tshirt.name}</h1>
      <img ref={drag} src={tshirt.image[tshirtView]} alt={'tshirt-selected'} />
    </div>)
  }

  const sizeHandler = (val) => {
    setSelectedSize(val)
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TSHIRT',
    drop: (item) => addItemsToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))



  const addItemsToBoard = (id) => {
    let tshirtBoardList;
    const numericId = Number(id);

    tshirtBoardList = TshirtData.filter((item) => item.id === numericId);

    setTshirtBoard(tshirtBoardList[0])
    if (totalPrice > 0) {
      setTotalPrice(0)
      setDesignBoardBack(null)
      setDesignBoardFront(null)
      setDesignPriceTracker(false)
    }
    addPriceForItem(tshirtBoardList[0].type)
  }

  return (
    <>
      <Navbar />
      <CustomizeWrapper>
        <SideBar designDataFunc={designDataFunc} />
        <div className="surface-area">
          <div ref={drop} className="board ">
            {Tshirtboard ? (
              <TshirtOnBoard tshirt={Tshirtboard} />
            ) : (
              ''
            )}
          </div>
          <Button text="Print" />

          <div>{totalPrice === 0 ? '' : `Price : ${tshirtOnlyPrice}`}</div>

        </div>
        <div className="tshirts-sidebar">
          <div className="front-back-side-option">
            {/* Sliding background bar */}
            <div
              className="slider"
              style={{
                transform:
                  tshirtView === "front" ? "translateX(-50%)" : "translateX(50%)",
              }}
            ></div>
            <span
              className={`front ${tshirtView === "front" ? "selected" : ""}`}
              onClick={() => TshirtViewHandler("front")}
            >
              Front-side
            </span>
            <span
              className={`back ${tshirtView === "back" ? "selected" : ""}`}
              onClick={() => TshirtViewHandler("back")}
            >
              Back-side
            </span>
          </div>
          <div className="tshirt-type-option">
            {
              TshirtData.map((tshirt, index) => {
                return <TshirtType tshirt={tshirt} />
              })
            }
          </div>
          <div className="color-option">
            <span>colors</span>
            <div className="colors-container">
              {
                colorsData.map((color) => {
                  return <div onClick={() => setSelectedColor(color)} className={`color-circle ${color}`}></div>
                })
              }
            </div>
          </div>
          <div className="size-option">
            {
              sizeData.map((size, index) => {
                return <div key={index} className={`sizes ${selectedSize === size ? 'selected' : ''}`} onClick={() => sizeHandler(size)}>{size}</div>
              })
            }
          </div>
        </div>
      </CustomizeWrapper>

      <Footer />
    </>
  );
};

export default Customize;

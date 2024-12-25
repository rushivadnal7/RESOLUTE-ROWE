// SizeChartModal.jsx
import React from 'react';
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  Title,
  Table,
  TableRow,
  TableData,
  ImageContainer,
  MeasurementText,
} from '../wrappers/SizeChartModal';

import sizeChartTshirt from '../assets/sizeChartTshirt.png'

const SizeChartModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>SIZE GUIDE</Title>
        <p>Lockedout Heart Oversized T-shirt</p>
        <p>Unisex T-shirt</p>
        
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>XXS</th>
              <th>XS</th>
              <th>S</th>
              <th>M</th>
              <th>L</th>
              <th>XL</th>
            </tr>
          </thead>
          <tbody>
            <TableRow>
              <TableData>CHEST</TableData>
              <TableData>39</TableData>
              <TableData>42</TableData>
              <TableData>44</TableData>
              <TableData>46</TableData>
              <TableData>48</TableData>
              <TableData>50</TableData>
            </TableRow>
            <TableRow>
              <TableData>LENGTH</TableData>
              <TableData>25</TableData>
              <TableData>27</TableData>
              <TableData>28</TableData>
              <TableData>29</TableData>
              <TableData>30</TableData>
              <TableData>30.5</TableData>
            </TableRow>
            <TableRow>
              <TableData>SHOULDER</TableData>
              <TableData>19.5</TableData>
              <TableData>20</TableData>
              <TableData>21</TableData>
              <TableData>22</TableData>
              <TableData>23</TableData>
              <TableData>24</TableData>
            </TableRow>
          </tbody>
        </Table>

        <ImageContainer>
          <img src={sizeChartTshirt} alt="Measurement Guide" />
          <MeasurementText>
            <h3>CHEST</h3>
            <p>Measure around the fullest part of your chest, keeping the tape measure horizontal.</p>
            <h3>WAIST</h3>
            <p>Wrap the measuring tape around your torso at the smallest part of your waist...</p>
            <h3>SHOULDER</h3>
            <p>Measure the length of the shoulder from the left sleeve stitch...</p>
          </MeasurementText>
        </ImageContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SizeChartModal;

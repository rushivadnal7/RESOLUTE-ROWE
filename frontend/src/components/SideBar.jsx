import React, { useEffect , useState} from 'react';
import styled from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';
import { DesignsData } from '../Data/DesignsImages';
import { ListDesignAPI } from '../api/designApis';
import { toast } from 'react-toastify';


const SideBarWrapper = styled.div`
   height: 100vh;
   width: 250px;
   /* background-image: linear-gradient(to bottom, #274060, #1B2845); */
   background-color: #f2f0ef;
   box-shadow: 5px 0px 20px rgba(0,0,0,0.6);
   padding: 10px;
   display: flex;
   flex-direction: column;
   overflow-y: scroll;
   flex-shrink: 0;
   scroll-behavior: auto;
   
   .design-container {
        margin: 20px;
        width: 150px;
        height: auto;
        position: relative;
        
        img {
            cursor: grab;
            width: 100%;
            height: 100%;
        }
   }
`;

const DesignItem = ({ design }) => {
    // console.log(design._id)
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'DESIGN',
        item: { id: design._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className="design-container p-4"
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <div>{design.name}</div>
            <img src={design.image} alt="design" />
        </div>
    );
};


const SideBar = ({designDataFunc}) => {

    const [designList, setDesignList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const data = await ListDesignAPI();
                // console.log("API Response:", data);

                if (isMounted) {
                    setDesignList(data.designs);
                    designDataFunc(data.designs)
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error fetching product list:", error);
                    toast.error("Something went wrong. Please try again.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false; // Cleanup
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            // Trigger a re-render or force the browser to recalculate the layout
        }, 100);  // adjust timing if necessary
        return () => clearTimeout(timer);
    }, []);


    return (
        <SideBarWrapper>
            {designList.map((design) => (
                <DesignItem key={design._id} design={design} />
            ))}
        </SideBarWrapper>
    );

};


export default SideBar;

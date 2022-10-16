import React from "react";
import { useEffect, useState } from "react";

const Liked = () => {

    useEffect(() => {
        //in progrsss
        try {
            api.get("/").then((response) => {
              setQuote((quot) => ({
                author: response.data.author,
                category: response.data.category,
                quote: response.data.quote,
                is_liked: response.data.is_liked
              }));
            });
      
          } catch (error) {
            console.log(error);
          }

    })


    return ( 
        <div>

        </div>
     );
}
 
export default Liked;
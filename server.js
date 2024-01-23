const express = require("express");
const app = express();

const PORT = 3001;

//const stripe = require('stripe')('sk_test_51OJs18DeAQc450QQx1df7rQv298LhrEKKTiTXXL5pzC5Wx4HjTQvA7dt3BiD74S5GMBco6bmk0yxc3T1nu8fW47600DijjICiS'
const stripe = require("stripe")('sk_test_51OJs18DeAQc450QQx1df7rQv298LhrEKKTiTXXL5pzC5Wx4HjTQvA7dt3BiD74S5GMBco6bmk0yxc3T1nu8fW47600DijjICiS');
//sk_test_51OJs18DeAQc450QQx1df7rQv298LhrEKKTiTXXL5pzC5Wx4HjTQvA7dt3BiD74S5GMBco6bmk0yxc3T1nu8fW47600DijjICiS
const YOUR_DOMAIN = "http://localhost:3001"

app.use(express.static("pages"));

app.post("/create-checkout-session",async(req,res) => {
    try{
        const prices = await stripe.prices.list({
            // lookup_keys: [req.body.lookup_key],
            // expand: ['data.product'],
        });
        // console.log(prices);

        console.log(prices)
        console.log(prices.data[0])
        console.log(prices.data[0].id);

        const session = await stripe.checkout.sessions.create({
            //セッションはお客様がどういう状態なのか。といった意味
            billing_address_collection:'auto',
            success_url:`${YOUR_DOMAIN}/success.html`,
            line_items : [{
                price:prices.data[0].id, 
                //作成したサブスクのIDを取得する。
                quantity:1,
                //契約の数といった意味

                
            },
        ], 
        mode:"subscription",
        success_url:`${YOUR_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:`${YOUR_DOMAIN}/cancel.html`,
        
        

        });
        

        res.redirect(303,session.url);
        console.log(session.url);

    }catch(error) {
        console.log(error);
    }

    // console.log(session)
    //     console.log(session.data[0])
})



app.listen(PORT,console.log("サーバーが起動しました"));
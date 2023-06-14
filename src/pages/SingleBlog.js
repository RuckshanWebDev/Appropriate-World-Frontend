import React from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'

function SingleBlog() {

    const { id } = useParams()
    console.log(id);

    return (
        <Layout>
            <div className="singleBlog-container container">

                <h1 className='title-big-color' >Title</h1>

                <img src="/1.png" alt="" />

                <div className="author-avatar">
                    <img src="/user.png" alt="" />
                    <div>
                        <h3>Ruckshan</h3>
                        <span>2 days ago</span>
                    </div>
                </div>

                <p className='blog-desc' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt totam in, dolor eius voluptate nemo consequatur, laboriosam cupiditate libero impedit labore necessitatibus dolorem harum voluptas vero natus nulla optio provident? Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quos tenetur quasi mollitia. Est, sed ipsa. Consequatur, optio consequuntur. Ea autem, corporis possimus ipsum quo voluptatem placeat error numquam modi.
                    <br />
                    <br />
                    Adipisci temporibus repellendus quod sint deserunt architecto? Et velit consequuntur eius autem vitae quibusdam hic in recusandae. Esse maxime saepe inventore debitis voluptatibus facilis? Blanditiis ipsum officiis omnis eos in!
                    Ut temporibus voluptatibus aperiam vel recusandae eius? Dolorem, ad. Ratione enim, necessitatibus sequi voluptatem culpa corrupti beatae inventore hic eum quo nihil? Ipsum alias assumenda esse aperiam minima facere repudiandae?
                    Eaque repudiandae debitis quasi. Nostrum eius nihil enim, tempora, nulla consequuntur tenetur iusto doloremque dicta magnam quaerat repudiandae voluptates, dolorum corrupti a necessitatibus suscipit odit non minima! Nulla, accusamus saepe.
                    Excepturi, quas. Sed fugit aperiam nam corrupti possimus, unde aspernatur, veniam suscipit facere id repellat consectetur iure fugiat nihil magnam quidem, autem quos illo. Velit accusantium distinctio esse doloremque labore.
                    <br />
                    <br />
                    Dicta natus aliquam nisi aut assumenda similique? Sit, nisi modi! Cum rerum sint a facere dignissimos cupiditate voluptates expedita laboriosam veniam? Iusto placeat molestiae magni laboriosam quaerat doloremque laudantium vero?
                    Itaque, minima labore possimus vitae nemo ea illo porro at recusandae! Similique perspiciatis quae iste nemo voluptatum a, omnis sint, repudiandae illum inventore eum nesciunt quod accusantium velit consequuntur. Iure!
                    Adipisci vitae saepe pariatur accusantium assumenda earum incidunt autem, ratione laudantium libero neque ullam corporis fugiat sequi dolores magni aliquid delectus quibusdam nostrum ea rerum at sed amet? Ipsam, culpa!
                    Eligendi accusamus quam, ipsum quis quas voluptate enim aliquid nobis, officia nostrum velit ratione ipsam saepe. Voluptate quasi quam quod at dignissimos doloribus voluptatum? Aspernatur atque esse veniam culpa sed!
                    <br />
                    <br />
                    Beatae ab libero facere aut, reiciendis accusamus rem eveniet culpa? Adipisci atque quibusdam illum harum quas architecto sunt quia iure doloremque repellendus? Recusandae quibusdam fuga quis ducimus. Atque, facilis quibusdam.
                    Quam alias vitae, ex a consequuntur nisi ducimus voluptatum unde eveniet praesentium vero sunt blanditiis maxime commodi sapiente deleniti consectetur dolorum velit quia repellendus laboriosam minima sequi esse expedita? Sit?
                    Tenetur nihil error possimus! Laboriosam amet, quos eligendi vel, blanditiis laborum veritatis fugiat tenetur officia quibusdam repellat quia ratione vitae neque esse dicta voluptas provident sunt in? Neque, assumenda quaerat.
                    Nobis quibusdam ducimus et! Vitae iste incidunt eligendi nisi, id corporis expedita optio, dolor porro amet possimus voluptas repellat quae modi. Maiores fugit impedit asperiores eius illum deserunt error blanditiis.
                    <br />
                    <br />
                    Eveniet velit amet facilis ut, cupiditate dolore debitis, id iusto et explicabo obcaecati cumque asperiores ipsa dolorum necessitatibus voluptas odit quos quisquam eius eos culpa laborum placeat ad. Perferendis, facere?
                    Soluta beatae quam possimus, tempora inventore harum quasi ducimus repudiandae numquam minima, deleniti eos libero neque at ad rem atque. Ut quae minima magnam! Quas sint ex voluptate fugit. Voluptatibus!
                    Fugiat fuga eaque nisi labore laborum doloribus obcaecati distinctio eveniet alias animi officiis quibusdam hic vel sit accusantium placeat, nobis quidem quia, fugit unde consequuntur doloremque. Tempore alias dicta doloremque!
                    Sequi illum odio quam error. Esse veritatis doloremque provident velit, autem cupiditate ipsum facere tempore vel corporis iste voluptatum voluptates rem! Excepturi blanditiis quos quibusdam autem modi accusantium cupiditate rem.
                    Minima, sint sequi nobis voluptatem nulla consequuntur quia similique quam explicabo mollitia! Asperiores mollitia amet earum iure itaque officiis, debitis beatae soluta vitae, animi, quis necessitatibus. Odio consectetur officia cum!
                    Minima repellendus hic, dolorem ad harum ipsum ea in. Maxime hic maiores suscipit, pariatur, quaerat ratione ipsam distinctio animi temporibus sunt asperiores, fugiat veritatis at dignissimos quod obcaecati fugit quidem.
                    Voluptatem nostrum porro dicta itaque et quisquam assumenda temporibus, consequuntur quis iure consectetur dolores autem ad ratione commodi velit suscipit, nesciunt cum cumque illum totam necessitatibus! Nisi tempora harum esse. </p>

            </div>
        </Layout>
    )
}

export default SingleBlog

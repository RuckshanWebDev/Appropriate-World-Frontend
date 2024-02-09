const getPackageName = (val) => {

    const products = {
        'price_1OQuXOF40YQ3vkpsBlkRE9pV': 'TESTING',
        'price_1OgTF4ImpSftCiTAJ1k9UvZF': 'EMERALD',
        'price_1OgTHoImpSftCiTAc7DcrZfW': 'ONYX'
    }

    return products[val]

}

export default getPackageName
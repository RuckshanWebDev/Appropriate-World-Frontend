const getPackageName = (val) => {

    const products = {
        'price_1OQuXOF40YQ3vkpsBlkRE9pV': 'TESTING',
        'price_1OQ7g4F40YQ3vkpsw9E7z5aM': 'EMERALD',
        'price_1OK1YfF40YQ3vkps5dcyQpPs': 'ONYX'
    }

    return products[val]

}

export default getPackageName
import merge from 'deepmerge';

export default class NodeLink {
    dataTemplate () {
        return {
            url: null,
            position: {
                x: 0,
                y: 100,
            },
            rectangle: {
                w: 33,
                h: 33,
            },
            icon: null, // string url
        };
    }
    normalize (data) {
        let new_data = this.dataTemplate();

        if (!data || !data.url)
            return null;

        return merge(new_data, data);
    }
}



export class DataPreparation {

    public static async convertObjectsToStringsInPayload(payload) {

        try {

            let keys = Object.keys(payload);

            for (let i = 0; i < keys.length; i++) {

                if (typeof (payload[keys[i]]) == 'object') {

                    payload[keys[i]] = JSON.stringify(payload[keys[i]]);
                }
            }
            return payload;
        } catch (err) {

            return {};
        }
    }

    public static async toProperCase(str) {

        str = str.trim();
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }

    public static async  removeDuplicates(array) {

        return [...new Set([...array])];
    };
}
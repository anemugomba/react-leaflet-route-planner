export type LocationServiceResponse = {
    Legs: [
        {
            Distance: number,
            DurationSeconds: number,
            EndPosition: LongitudeLatitude,
            StartPosition: LongitudeLatitude,
            Steps: Step[]
        }
    ],
    Summary: Summary,
    "@metadata": MetaData
}

export type LongitudeLatitude = [lognitude: number, latitude: number];

export type Step = {
    "Distance": number,
    "DurationSeconds": number,
    "EndPosition": LongitudeLatitude,
    "StartPosition": LongitudeLatitude
}

export type Summary = {
    "DataSource": string,
    "Distance": number,
    "DistanceUnit": string,
    "DurationSeconds": number,
    "RouteBBox": [number,number,number,number]
}

export type MetaData = {
    "statusCode": number,
    "effectiveUri": string,
    "headers": {
        "date": string,
        "content-type": string,
        "content-length": string,
        "connection": string,
        "x-amzn-requestid": string,
        "access-control-allow-origin": string,
        "x-amz-apigw-id": string,
        "access-control-expose-headers": string,
        "x-amzn-trace-id": string,
    },
    "transferStats": {
        "http": [
            []
        ]
    }
}
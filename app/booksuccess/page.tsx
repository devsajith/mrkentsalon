export default async function BookingSuccess({
    searchParams,
}: {
    searchParams: Promise<{
        reference: string;
        customer: string;
        service: string;
        date: string;
        time: string;
    }>;
}) {

    const params =
        await searchParams;

        console.log("Search Params:", params);

    return (

        <div className="max-w-xl mx-auto p-6">

            <div className="bg-white rounded-lg shadow p-6">

                <h1 className="text-3xl font-bold mb-6 text-green-600">

                    Booking Confirmed

                </h1>

                <div className="space-y-3">

                    <p>

                        <strong>
                            Reference:
                        </strong>

                        {" "}

                        {
                            params.reference
                        }

                    </p>

                    <p>

                        <strong>
                            Customer:
                        </strong>

                        {" "}

                        {
                            params.customer
                        }

                    </p>

                    <p>

                        <strong>
                            Service:
                        </strong>

                        {" "}

                        {
                            params.service
                        }

                    </p>

                    <p>

                        <strong>
                            Date:
                        </strong>

                        {" "}

                        {
                            params.date
                        }

                    </p>

                    <p>

                        <strong>
                            Time:
                        </strong>

                        {" "}

                        {
                            params.time
                        }

                    </p>

                </div>

            </div>

        </div>

    );

}
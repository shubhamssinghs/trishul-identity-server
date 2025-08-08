import { AddNewClient, ClientCard, ClientCardSkeleton } from "./";
import { useAsyncService } from "@hooks";
import { ErrorComponent, Pagination } from "@components";
import { clientServiceInstance } from "@services";

export const ClientListContent = () => {
  const { response, error, execute, params, isLoading } = useAsyncService(
    clientServiceInstance.list,
    true,
    {
      limit: 6,
      offset: 0,
    }
  );

  if (isLoading) return <ClientCardSkeleton className="flex-1" count={6} />;

  if (error) return <ErrorComponent error={error} className="flex-1" />;
  if (!response?.data?.length) return <AddNewClient />;

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 flex-1">
        {response.data.map((client, index) => (
          <ClientCard key={client.id ?? index} {...client} />
        ))}
      </div>
      <div className="w-full flex justify-end">
        <Pagination
          total={response.total}
          limit={params!.limit}
          offset={params!.offset}
          hasNextPage={response.hasNextPage}
          hasPreviousPage={response.hasPreviousPage}
          onChange={(newParams) => execute(newParams)}
        />
      </div>
    </div>
  );
};

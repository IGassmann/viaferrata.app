import Badge from "@/components/Badge";
import db from "@/lib/db";
import { routes } from "@/lib/db/schema";
import { type DateTimeDuration, parseDuration } from "@internationalized/date";
import { CarIcon, TrainIcon } from "lucide-react";

async function listRoutes() {
  const routeRows = await db
    .select({
      id: routes.publicID,
      name: routes.name,
      duration: routes.duration,
      difficultyGrade: routes.difficultyGrade,
      coordinates: routes.coordinates,
    })
    .from(routes);

  return routeRows.map((route) => ({
    ...route,
    duration: parseDuration(route.duration),
    coordinates: {
      longitude: route.coordinates.x,
      latitude: route.coordinates.y,
    },
  }));
}

function formatDuration(duration: DateTimeDuration): string {
  const parts = [];
  if (duration.years) {
    parts.push(`${duration.years}y`);
  }
  if (duration.months) {
    parts.push(`${duration.months}m`);
  }
  if (duration.weeks) {
    parts.push(`${duration.weeks}w`);
  }
  if (duration.days) {
    parts.push(`${duration.days}d`);
  }
  if (duration.hours) {
    parts.push(`${duration.hours}h`);
  }
  if (duration.minutes) {
    parts.push(`${duration.minutes}m`);
  }
  if (duration.seconds) {
    parts.push(`${duration.seconds}s`);
  }
  return parts.join(" ");
}

export default async function HomePage() {
  const routes = await listRoutes();
  return (
    <menu className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-6">
      {routes.map((route) => (
        <li
          className="relative h-full w-full overflow-hidden rounded-lg bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline"
          key={route.id}
        >
          <img
            alt=""
            src={`https://picsum.photos/seed/${encodeURIComponent(route.name)}/512`}
            className="aspect-[10/7] bg-zinc-300 shadow dark:bg-zinc-800"
          />
          <div className="space-y-3.5 p-2">
            <div className="text-base/6 font-semibold">{route.name}</div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge color={"green"}>{route.difficultyGrade}</Badge>
                <span className="text-xs/6 text-zinc-600">
                  {formatDuration(route.duration)}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs/6 text-zinc-500">
                <div className="flex items-center gap-2">
                  <CarIcon
                    size={16}
                    strokeWidth={1.5}
                    className="size-4 shrink-0"
                  />
                  {Object.values(route.coordinates).join(", ")}
                </div>{" "}
                <span aria-hidden="true">·</span>{" "}
                <div className="flex items-center gap-2">
                  <TrainIcon
                    size={16}
                    strokeWidth={1.5}
                    className="size-4 shrink-0"
                  />
                  {Object.values(route.coordinates).join(", ")}
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </menu>
  );
}

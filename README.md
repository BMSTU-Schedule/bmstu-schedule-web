# BMSTU-Schedule Web Application
The app generates [.ics](https://en.wikipedia.org/wiki/ICalendar) file with the schedule for a certain group in
BMSTU.

The working site is here: http://bmstu-schedule.ru

## Running the app
1. At first clone the repository:
```bash
git clone https://github.com/BMSTU-Schedule/web.git
cd web
```

2. Build the docker image:
```bash
docker build -t bmstu-ical .
```

3. Run a container (replace `<PORT>` with port you want to listen):
```bash
docker run -p <PORT>:80 -v <PATH_WITH_ICS>:/ics bmstu-ical
```

Open `http://localhost:<PORT>` in the browser.

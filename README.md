# LEOGIC VIZION

## What is this?

A small web app where you **upload a photo** and the app **finds objects** in it (people, cars, animals, and many everyday things). It draws boxes around what it finds and shows labels.

---

## The two main parts


| Part                         | What it is                                                |
| ---------------------------- | --------------------------------------------------------- |
| **Front-end** (`front-end/`) | The website you see in the browser (built with React).    |
| **Back-end** (`back-end/`)   | A server that receives your image and runs the detection. |


The front-end talks to the back-end over the network. They are meant to run **at the same time** on your computer while you develop.

---

## The vision model (YOLOv8 Medium)

The project uses **YOLOv8 Medium** saved as an ONNX file: `yolov8m.onnx`.

**Why this one?** In simple terms, YOLOv8 comes in a few sizes (small, medium, large, etc.). **Medium** is a good balance: it is **more accurate** than the small version, but still **reasonable to run** on a normal machine for a demo. The “large” versions can be slower or need more memory.

**You need the model file on disk.** Put it here (create folders if needed):

`back-end/src/vision_models/detection/yolov8m.onnx`

If this file is missing, detection will not work until you add a compatible YOLOv8 Medium ONNX model at that path.

---

## Before you start

- Install **[Node.js](https://nodejs.org/)** (the LTS version is fine). That gives you `npm`.

---

## Install packages

Open a terminal in the project folder and run **both** of these (each in its own folder):

**Back-end**

```bash
cd back-end
npm install
```

**Front-end**

```bash
cd front-end
npm install
```

---

## Run the app

You need **two terminals**—one for the server, one for the website.

**1. Start the back-end** (from `back-end/`):

```bash
npx nodemon server.js
```

You should see something like: server listening on **port 3001**.

**2. Start the front-end** (from `front-end/`):

```bash
npm start
```

Your browser should open the app (usually **[http://localhost:3000](http://localhost:3000)**). The front-end is set up to call the API at **[http://localhost:3001](http://localhost:3001)**.

---

## Quick checklist

1. Node.js installed
2. `npm install` in `back-end` and `front-end`
3. `yolov8m.onnx` in `back-end/src/vision_models/detection/`
4. Run `npx nodemon server.js` in `back-end`
5. Run `npm start` in `front-end`

---

## Ports (for reference)

- **3000** — web app (React)  
- **3001** — API server (Express)

If you change ports, update the front-end `BASE_URL` in `front-end/src/constants.js` so it still points at your API.



HAVE FUN ⚡
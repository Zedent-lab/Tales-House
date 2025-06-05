# tales house landing page

landing page for tales house - kenyan content creator collective

## what is this

interactive website for our creator group. has animations and stuff. looks decent i guess.

## features

- cursor thing that follows your mouse around
- some stars in the background that move
- gradients everywhere because why not  
- works on mobile (tested on my phone)
- doesn't lag too much
- scroll effects that are kinda smooth

## setup

need nodejs. if you dont have it get it.

```
npm install
npm run dev
```

go to localhost:5173 or whatever it says in terminal

## stuff you can run

```
npm run dev - starts the thing
npm run build - makes it ready for production  
npm run preview - tests production build
npm run lint - tells you whats broken
```

## folders

```
src/
  App.jsx - main component with everything
  main.jsx - react entry point
  index.css - tailwind imports
```

thats it. kept it simple.

## customizing

- change social links to actual ones
- update the stats (currently just random numbers)
- swap colors if you want different vibes
- replace placeholder content with real stuff
- button links go nowhere right now so fix that

## tech stack

react, vite, tailwind css, bunch of css animations

## performance notes

used requestAnimationFrame for cursor so it doesnt kill your browser. scroll events are throttled. animations use proper css properties. should run smooth on most devices.

## notes

made this for tales house kenya. cursor animation might be too much for some people but creators seem to like flashy stuff. stars are subtle. everything responsive because its 2025.

probably needs some real content and actual links but the foundation is there. feel free to break it and make it better.

## todo

- [ ] add real content  
- [ ] fix button links
- [ ] maybe add more animations?
- [ ] test on more devices
- [ ] add contact form maybe

built by Clay Gitobu for tales house collective, Kenyan tiktok house.

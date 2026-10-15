# Math Mastery Quest

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>MathQuest – Le Jeu des Automatismes</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #0f0f1a; --card: #1a1a2e; --a1: #f7c948; --a2: #ff6b6b;
            --a3: #4ecdc4; --a4: #a29bfe; --a5: #fd79a8; --a6: #55efc4;
            --text: #eaf0fb; --muted: #8892a4; --r: 18px;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { background: var(--bg); color: var(--text); font-family: 'Nunito', sans-serif; overflow-x: hidden; }
        
        /* Layout */
        .wrap { max-width: 600px; margin: 0 auto; padding: 15px; position: relative; z-index: 1; }
        header { text-align: center; padding: 20px 0; }
        .logo { font-size: 2.2rem; font-weight: 900; letter-spacing: -1px; }
        .logo span:nth-child(1) { color: var(--a1); }
        .logo span:nth-child(2) { color: var(--a3); }

        /* HUD & Progress */
        .hud { display: flex; align-items: center; gap: 10px; background: var(--card); border-radius: var(--r); padding: 12px; margin-bottom: 15px; border: 1px solid rgba(255,255,255,0.05); }
        .xp-bar-wrap { flex: 1; background: rgba(255,255,255,0.07); border-radius: 50px; height: 10px; overflow: hidden; }
        .xp-bar { height: 100%; background: linear-gradient(90deg, var(--a1), var(--a3)); width: 0%; transition: 0.5s; }

        /* Screens */
        .screen { display: none; animation: fadeIn 0.4s ease; }
        .screen.active { display: block; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        /* Keypad & Input */
        .qcard { background: var(--card); border-radius: var(--r); padding: 20px; margin-bottom: 15px; border: 1px solid rgba(255,255,255,0.1); }
        .qtxt { font-size: 1.3rem; font-weight: 700; text-align: center; margin-bottom: 15px; }
        .oi { width: 100%; background: rgba(0,0,0,0.3); border: 2px solid rgba(255,255,255,0.1); color: #fff; padding: 15px; border-radius: 12px; font-size: 1.5rem; text-align: center; outline: none; margin-bottom: 15px; font-family: 'Space Mono'; }
        
        .key-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        .key-grid button { padding: 15px 5px; border-radius: 10px; border: none; background: rgba(255,255,255,0.05); color: white; font-weight: 800; font-family: 'Space Mono'; cursor: pointer; font-size: 1.1rem; }
        .key-grid button:active { background: var(--a4); }
        .k-op { color: var(--a3); }
        .k-val { background: var(--a6) !important; color: var(--bg) !important; grid-column: span 2; }
        .k-del { background: rgba(255,107,107,0.2) !important; color: var(--a2); }

        /* Diagnostic & Badges */
        .mission-report { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px; }
        .badge { background: rgba(255,255,255,0.03); padding: 12px; border-radius: 12px; border-left: 4px solid var(--a4); text-align: left; }
        .badge-label { font-size: 0.65rem; text-transform: uppercase; color: var(--muted); display: block; }
        .badge-value { font-family: 'Space Mono'; font-weight: 700; font-size: 1rem; }

        /* Duel Mode */
        #sDuel { height: 100vh; flex-direction: column; display: none; }
        #sDuel.active { display: flex; }
        .duel-half { height: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; position: relative; }
        .duel-limit { border: none; height: 2px; background: var(--a4); width: 100%; opacity: 0.3; }
        
        /* Utility */
        .btn-main { background: var(--a1); color: var(--bg); border: none; padding: 15px 30px; border-radius: 50px; font-weight: 900; cursor: pointer; width: 100%; margin: 10px 0; font-size: 1rem; }
        .htxt { background: rgba(162,155,254,0.1); padding: 12px; border-radius: 10px; margin-top: 10px; font-size: 0.9rem; border-left: 4px solid var(--a4); display: none; }
    






    


        

MathQuest


        

ÉDITION AUTOMATISMES


    



    


        Niv.1
        


        09:00
    



    


        🏋️ ENTRAÎNEMENT LIBRE
        ⏱️ MODE EXAMEN (9 MIN)
        ⚔️ MODE DUEL (2 JOUEURS)
        
        


    



    


        


            

Compétence


            

Combien font 7 x 8 ?


            
            Passer cette question
        



        


            


                789/
                456×
                123-
                0,x²+
                ⌫x
                VALIDER
            


        



        


    



    


        


            

Mission Accomplie !


            

0/12


            
            


                

⚡ Vitesse-


                

🎯 Précision-


            



            


            
            🏠 RETOUR AU MENU
        


    






    


        

Joueur 2 : 0


        

Prêt ?


        


             789
             456
             123
             0⌫
        


    


    


        

Joueur 1 : 0


        

Prêt ?


        


             789
             456
             123
             0⌫

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://mathquest-automagic.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2dd9a875-d2b9-48c2-97e0-686b2e1fbf22).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

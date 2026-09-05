import { Composition, Folder } from 'remotion';
import { Reel1Hero, REEL1_DURATION } from './reels/Reel1Hero';
import { Reel2Surfaces, REEL2_DURATION } from './reels/Reel2Surfaces';
import { Reel3Hook, REEL3_DURATION } from './reels/Reel3Hook';
import { Reel4Cooked, REEL4_DURATION, REEL4_FPS } from './reels/Reel4Cooked';
import { Reel5Aura, REEL5_DURATION, REEL5_FPS } from './reels/Reel5Aura';
import { Post1Stat } from './posts/Post1Stat';
import { Post2Grid } from './posts/Post2Grid';
import { Post3Install } from './posts/Post3Install';
import { Post4Surfaces } from './posts/Post4Surfaces';
import { Post5Position } from './posts/Post5Position';

const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1920;
const POST_SIZE = 1080;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Brand reels — house style, 30fps, transition-driven. */}
      <Folder name="Reels-Brand">
        <Composition
          id="Reel1Hero"
          component={Reel1Hero}
          durationInFrames={REEL1_DURATION}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Reel2Surfaces"
          component={Reel2Surfaces}
          durationInFrames={REEL2_DURATION}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Reel3Hook"
          component={Reel3Hook}
          durationInFrames={REEL3_DURATION}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>

      {/* Gen-Z cuts — 60fps, hard cuts locked to the track's beat grid. */}
      <Folder name="Reels-GenZ">
        <Composition
          id="Reel4Cooked"
          component={Reel4Cooked}
          durationInFrames={REEL4_DURATION}
          fps={REEL4_FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Reel5Aura"
          component={Reel5Aura}
          durationInFrames={REEL5_DURATION}
          fps={REEL5_FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>

      <Folder name="Posts">
        <Composition
          id="Post1Stat"
          component={Post1Stat}
          durationInFrames={90}
          fps={FPS}
          width={POST_SIZE}
          height={POST_SIZE}
        />
        <Composition
          id="Post2Grid"
          component={Post2Grid}
          durationInFrames={90}
          fps={FPS}
          width={POST_SIZE}
          height={POST_SIZE}
        />
        <Composition
          id="Post3Install"
          component={Post3Install}
          durationInFrames={90}
          fps={FPS}
          width={POST_SIZE}
          height={POST_SIZE}
        />
        <Composition
          id="Post4Surfaces"
          component={Post4Surfaces}
          durationInFrames={90}
          fps={FPS}
          width={POST_SIZE}
          height={POST_SIZE}
        />
        <Composition
          id="Post5Position"
          component={Post5Position}
          durationInFrames={90}
          fps={FPS}
          width={POST_SIZE}
          height={POST_SIZE}
        />
      </Folder>
    </>
  );
};

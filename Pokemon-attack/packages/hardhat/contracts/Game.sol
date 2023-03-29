// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC1155LazyMint.sol";

error GAME_NOT_ACTIVE();

contract PokemonAttack is ERC1155LazyMint {
  uint256 public immutable gameTime = 24 hours;
  bool public started;

  struct Game {
    uint256 gameStartingTime;
    uint256 gameEndingTime;
    uint256 playersPlayed;
    bool gameActive;
    address[] allplayers;
  }

  mapping(uint256 => Game) public games;
  uint256 gameId;

  constructor(
    string memory _name,
    string memory _symbol,
    address _royaltyRecipient,
    uint128 _royaltyBps
  ) ERC1155LazyMint(_name, _symbol, _royaltyRecipient, _royaltyBps) {
    games[gameId].gameStartingTime = block.timestamp;
    games[gameId].gameEndingTime = block.timestamp + gameTime;
    games[gameId].gameActive = true;
    started = true;
  }

  /*
  @dev start new game
  */
  function startNewGame() public {
    Game storage _game = games[gameId];
    require(_game.gameEndingTime < block.timestamp, "Game not ended");
    if (_game.gameActive) {
      _game.gameActive = false;
    }
    gameId += 1;
    _game.gameStartingTime = block.timestamp;
    _game.gameEndingTime = block.timestamp + gameTime;
    _game.gameActive = true;
  }

  modifier isGameActive() {
    if (!started || !games[gameId].gameActive) {
      revert GAME_NOT_ACTIVE();
    }
    _;
  }

  /*
  @dev claim a level one pickachu to start playing
  */
  function claimLevelOnePickachu() external isGameActive {
    require(games[gameId].gameEndingTime > block.timestamp, "GAME ENDED");
    // run a check to see if the game is active
    claim(msg.sender, 0, 1);
    games[gameId].allplayers.push(msg.sender);
    games[gameId].playersPlayed += 1;
    // emit an event
  }

  /*
  @dev verify the claim
  */
  function verifyClaim(address _claimer, uint256 _tokenId, uint256 _quantity) public view virtual override {
    // Your custom claim restriction logic
  }

  /*
  @dev Allow the owner to be able to pause the contract
  */
  function pauseGame() public {
    require(msg.sender == owner(), "NOT OWNER");
    started = false;
  }
}

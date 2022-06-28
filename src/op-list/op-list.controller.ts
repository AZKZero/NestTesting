import { Controller, Get, Logger, ParseBoolPipe, Query } from '@nestjs/common';
import { OperatorDocument, R6Operator } from './schemas/operators.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import r6operators from 'r6operators';
import { StatsOperator } from 'r6s-stats-api/types/operator';
@Controller('op-list')
export class OpListController {
  private readonly logger = new Logger(OpListController.name);
  constructor(
    @InjectModel(R6Operator.name)
    private opModel: Model<OperatorDocument>,
  ) {}

  R6 = require('r6s-stats-api');

  private readonly operators = [
    r6operators.sledge,
    r6operators.thatcher,
    r6operators.ash,
    r6operators.thermite,
    r6operators.twitch,
    r6operators.montagne,
    r6operators.glaz,
    r6operators.fuze,
    r6operators.blitz,
    r6operators.iq,
    r6operators.buck,
    r6operators.blackbeard,
    r6operators.capitao,
    r6operators.hibana,
    r6operators.jackal,
    r6operators.ying,
    r6operators.zofia,
    r6operators.dokkaebi,
    r6operators.lion,
    r6operators.finka,
    r6operators.maverick,
    r6operators.nomad,
    r6operators.gridlock,
    r6operators.nokk,
    r6operators.amaru,
    r6operators.kali,
    r6operators.iana,
    r6operators.ace,
    r6operators.zero,
    r6operators.flores,
    r6operators.osa,
    r6operators.sens,
    r6operators.smoke,
    r6operators.mute,
    r6operators.castle,
    r6operators.pulse,
    r6operators.doc,
    r6operators.rook,
    r6operators.kapkan,
    r6operators.tachanka,
    r6operators.jager,
    r6operators.bandit,
    r6operators.frost,
    r6operators.valkyrie,
    r6operators.caveira,
    r6operators.echo,
    r6operators.mira,
    r6operators.lesion,
    r6operators.ela,
    r6operators.vigil,
    r6operators.alibi,
    r6operators.maestro,
    r6operators.clash,
    r6operators.kaid,
    r6operators.mozzie,
    r6operators.warden,
    r6operators.goyo,
    r6operators.wamai,
    r6operators.oryx,
    r6operators.melusi,
    r6operators.aruni,
    r6operators.thunderbird,
    r6operators.thorn,
    r6operators.azami,
  ];

  private readonly attackers = [
    r6operators.sledge,
    r6operators.thatcher,
    r6operators.ash,
    r6operators.thermite,
    r6operators.twitch,
    r6operators.montagne,
    r6operators.glaz,
    r6operators.fuze,
    r6operators.blitz,
    r6operators.iq,
    r6operators.buck,
    r6operators.blackbeard,
    r6operators.capitao,
    r6operators.hibana,
    r6operators.jackal,
    r6operators.ying,
    r6operators.zofia,
    r6operators.dokkaebi,
    r6operators.lion,
    r6operators.finka,
    r6operators.maverick,
    r6operators.nomad,
    r6operators.gridlock,
    r6operators.nokk,
    r6operators.amaru,
    r6operators.kali,
    r6operators.iana,
    r6operators.ace,
    r6operators.zero,
    r6operators.flores,
    r6operators.osa,
  ];

  private readonly defenders = [
    r6operators.smoke,
    r6operators.mute,
    r6operators.castle,
    r6operators.pulse,
    r6operators.doc,
    r6operators.rook,
    r6operators.kapkan,
    r6operators.tachanka,
    r6operators.jager,
    r6operators.bandit,
    r6operators.frost,
    r6operators.valkyrie,
    r6operators.caveira,
    r6operators.echo,
    r6operators.mira,
    r6operators.lesion,
    r6operators.ela,
    r6operators.vigil,
    r6operators.alibi,
    r6operators.maestro,
    r6operators.clash,
    r6operators.kaid,
    r6operators.mozzie,
    r6operators.warden,
    r6operators.goyo,
    r6operators.wamai,
    r6operators.oryx,
    r6operators.melusi,
    r6operators.aruni,
    r6operators.thunderbird,
    r6operators.thorn,
    r6operators.azami,
  ];
  @Get('list')
  async getOperators(@Query('attacker', ParseBoolPipe) attacker: boolean) {
    return {
      data: this.operators
        .filter((value) =>
          attacker ? value.role == 'Attacker' : value.role == 'Defender',
        )
        .map((value) => ({
          id: value.id,
          name: value.name,
          bio: value.bio,
          role: value.role,
          unit: value.unit,
          png: `https://r6operators.marcopixel.eu/icons/png/${value.id}.png`,
        })),
    };
  }
  @Get('listAll')
  async getAllOperators() {
    return {
      data: this.operators.map((value) => ({
        id: value.id,
        name: value.name,
        bio: value.bio,
        role: value.role,
        unit: value.unit,
        png: `https://r6operators.marcopixel.eu/icons/png/${value.id}.png`,
      })),
    };
  }

  @Get('operator_det')
  async getOperatorDetails(@Query('op_id') operatorId: string) {
    return {
      ...this.operators.find((value) => value.id === operatorId),
      png: `https://r6operators.marcopixel.eu/icons/png/${operatorId}.png`,
    };
  }

  @Get('operator_stats')
  async getOperatorStats(
    @Query('op_id') operatorId: string,
    @Query('platform') platform: string,
    @Query('uname') username: string,
  ) {
    let response;
    try {
      response = await this.R6.operator(platform, username, operatorId);
      this.logger.log(response);
    } catch (e) {
      const gen = await this.R6.general(platform, username);
      response = {
        url: `https://r6.tracker.network/profile/${platform}/${username}/operators`,
        name: username,
        header: gen.header,
        operator: operatorId,
        time_played: '0h 0m',
        kills: '0',
        deaths: '0',
        kd: '0.0',
        wins: '0',
        losses: '0',
        win_: '0%',
        headshots_: '0%',
        dbnos: '0',
        xp: '0',
        melee_kills: '0',
        operator_stat: '0',
        operator_img: '0',
      };
      this.logger.error(e);
    } finally {
      return response;
    }
  }
}

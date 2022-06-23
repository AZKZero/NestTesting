import { Controller, Get, Logger, ParseBoolPipe, Query } from '@nestjs/common';
import { OperatorDocument, R6Operator } from './schemas/operators.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import r6operators from 'r6operators';
@Controller('op-list')
export class OpListController {
  private readonly logger = new Logger(OpListController.name);
  constructor(
    @InjectModel(R6Operator.name)
    private opModel: Model<OperatorDocument>,
  ) {}

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
      data: (attacker ? this.attackers : this.defenders).map((value) => ({
        id: value.id,
        name: value.name,
        bio: value.bio,
        role: value.role,
        unit: value.unit,
        png: `https://r6operators.marcopixel.eu/icons/png/${value.id}.png`,
      })),
    };
  }
}
